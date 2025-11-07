import Session from "../models/Session.model.js";
import { chatClient, streamClient } from "../lib/stream.lib.js";


const createSession = async (req, res) => {
    try {
        const { problem, difficulty } = req.body;
        const clerkId = req.user.clerkId;
        const userId = req.user._id


        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and difficulty are required" });
        }


        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;


        const newSession = {
            problem,
            difficulty,
            host: userId,
            callId
        }

        const session = await Session.create(newSession);

        if (!session) throw new Error("Error in creating server");

        // create stream video call
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {
                    problem,
                    difficulty,
                    sessionId: userId.toString(),
                    sessionId: session._id.toString()
                },
            },
        });
        //  chat stream with same id
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId],
        });

        await channel.create();

        res.status(201).json({ session });
    } catch (error) {
        console.log("Error in createSession controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



// Get all active sessions
const getActiveSession = async (req, res) => {
    try {
        const activeSession = await Session.find({ status: "active" })
            .populate("participant", "name profileImage email clerkId")
            .populate("host", "name profileImage email clerkId")
            .sort({ createdAt: -1 })
            .limit(20)


        res.status(200).json({ activeSession });
    } catch (error) {
        console.log("Error in getActiveSessions controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Get recent sessions for current user
const myRecentSession = async (req, res) => {
    try {
        const userId = req.user._id;

        // get sessions where user is either host or participant
        const sessions = await Session.find({
            status: "completed",
            $or: [{ host: userId }, { participant: userId }],
        })
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({ sessions });
    } catch (error) {
        console.log("Error in myRecentSessions controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Get session by ID
const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await Session.findById(id)
            .populate("host", "name email profileImage clerkId")
            .populate("participant", "name email profileImage clerkId");

        if (!session) return res.status(404).json({ message: "Session not found" });

        res.status(200).json({ session });
    } catch (error) {
        console.log("Error in getSessionById controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Join a session
const joinSession = async (req, res) => {
    try {
        // your logic here
        const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "Session not found" });

        if (session.status !== "active") {
            return res.status(400).json({ message: "Cannot join a completed session" });
        }

        if (session.host.toString() === userId.toString()) {
            return res.status(400).json({ message: "Host cannot join their own session as participant" });
        }

        // check if session is already full - has a participant
        if (session.participant) return res.status(409).json({ message: "Session is full" });


        if (session.participant) return res.status(409).json({ message: "Session is full" });

        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        res.status(200).json({ message: "Joined session successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// End a session
const endSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "Session not found" });

        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only the host can end the session" });
        }

        if (session.status === "completed") {
            return res.status(400).json({ message: "Session is already completed" });
        }

        // delete stream video call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({ hard: true });

        // delete stream chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        res.status(200).json({ session, message: "Session ended successfully" });
    } catch (error) {
        console.log("Error in endSession controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export {
    createSession,
    getActiveSession,
    myRecentSession,
    endSession,
    getSessionById,
    joinSession
}
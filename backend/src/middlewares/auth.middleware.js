import { requireAuth } from "@clerk/express";
import User from "../models/User.model.js";


export const authMiddleware = [
    requireAuth({signInUrl:"/sign-in"}),
    async (req, res, next) => {

        try {
            const { userId } = getAuth(req);
            if (!userId) return res.status(400).json({msg:"userId Not found"});

            const user = await User.findOne({ clerkId: userId });
            if (!user) return res.status(402).json({msg:"User not found"});

            req.user = user;
            next();

            
        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error" + `${error}` })
            console.error("Internal Server Error", error)

        }
    }
]
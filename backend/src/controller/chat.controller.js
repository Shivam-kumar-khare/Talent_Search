import { chatClient } from "../lib/stream.lib.js"

export const getStreamToken=async (req,res)=>{
    try {
        //we need to use clerk id not mongodb _id as we saved user by clerk id in stream
        const token=chatClient.createToken(req.user.clerkId);
        const data={
            token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.usr.image

        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({msg:"internal server error"});
        console.error("Error in getStreamToken",error.message)
    }

}
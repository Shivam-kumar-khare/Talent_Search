import {Inngest} from "inngest";
import User from "../models/User.model.js"
import { connectDb } from "./database.js";

export const inngest= new Inngest({id:"talent-search"});


const syncUser = inngest.createFunction(
    {id:"syncUser"},
    {event:"clerk/user.created"},
    async ({event})=>{
        await connectDb();
        const {email_addresses,first_name,last_name,profile_image_url,id}=event.data;
        await User.create({
            name:`${first_name||""}  ${last_name||""} `,
            email:email_addresses[0]?.email_address,
            profileImage:profile_image_url,
            clerkId:id

        })
    }
)
const deleteUser = inngest.createFunction(
    {id:"deleteUser"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        await connectDb();
        const {id}=event.data;
        await User.findOneAndDelete({
            clerkId:id
        })
    }
)

export const functions=[deleteUser,syncUser];
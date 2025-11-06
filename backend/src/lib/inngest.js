import { Inngest } from "inngest";
import User from "../models/User.model.js";
import { connectDb } from "./database.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.lib.js";

export const inngest = new Inngest({ id: "talent-search" });

/**
 * Handle Clerk user creation
 */
const syncUser = inngest.createFunction(
  { id: "syncUser" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDb();

      const { email_addresses, first_name, last_name, image_url, id } = event.data;

      if (!id || !email_addresses?.length) {
        console.warn("Invalid user data received from Clerk:", event.data);
        return;
      }

      const newUser = {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses[0].email_address,
        profileImage: image_url || "",
        clerkId: id,
      };

      // Upsert to prevent duplicates
      const savedUser = await User.findOneAndUpdate(
        { clerkId: id },
        newUser,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      const userData = {
        name: savedUser.name,
        profileImage: savedUser.profileImage,
        clerkId: savedUser.clerkId,
        email: savedUser.email,
      };

      await upsertStreamUser(id);

      console.log(`✅ Synced user ${savedUser.email} (${savedUser.clerkId})`);
    } catch (error) {
      console.error("❌ Error syncing user:", error);
      throw error; // Ensure Inngest logs the error
    }
  }
);

/**
 * Handle Clerk user deletion
 */
const deleteUser = inngest.createFunction(
  { id: "deleteUser" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDb();

      const { id } = event.data;

      if (!id) {
        console.warn("Missing Clerk user ID for deletion:", event.data);
        return;
      }

      const deletedUser = await User.findOneAndDelete({ clerkId: id });

      if (deletedUser) {
        await deleteStreamUser(id.toString());
        console.log(`🗑️ Deleted user ${deletedUser.email} (${id})`);
      } else {
        console.warn(`⚠️ No user found with clerkId: ${id}`);
      }
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw error;
    }
  }
);

export const functions = [deleteUser, syncUser];

import {Schema,model} from "mongoose";

const sessionSchema = new Schema({
  problem: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },
  callId: {
    type: String,
    default: null
  }
});

const Session = model("Session", sessionSchema);
export default Session;

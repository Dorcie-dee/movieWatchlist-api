import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import normalize from "normalize-mongoose"


const movieSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  // watched: { type: Boolean, default: false },
  title: { type: String, required: true },
  status: { type: String, enum: ["watched", "not watched"], default: "not watched" }
}, { timestamps: true });

movieSchema.plugin(normalize)
export const MovieModel = model('Movie', movieSchema)


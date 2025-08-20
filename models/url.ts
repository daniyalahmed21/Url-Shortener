import mongoose, { Document, Schema } from "mongoose";

// 1. Define an interface for the document
export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema: Schema<IUrl> = new Schema(
  {
    originalUrl: {
      type: String,
      unique: true,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Url = mongoose.models.Url || mongoose.model<IUrl>("Url", urlSchema);

export default Url;

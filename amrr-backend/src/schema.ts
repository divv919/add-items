import mongoose from "mongoose";

const Item = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemType: { type: String, required: true },
  coverImage: {
    fileName: String,
    contentType: String,
    data: Buffer,
  },
  additionalImage: [
    {
      fileName: String,
      contentType: String,
      data: Buffer,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const ItemModel = mongoose.model("Item", Item);

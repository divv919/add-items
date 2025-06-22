import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { ItemModel } from "./schema";
const app = express();

app.use(cors());
mongoose.connect(process.env.DATABASE_CONNECTION_STRING || "");

app.listen(3000, () => {
  console.log("Listening at Port : 3000");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post(
  "/add-data",
  upload.fields([
    { name: "coverImage", maxCount: 1 }, // ✅ single file
    { name: "additionalImage", maxCount: 10 }, // ✅ multiple files
  ]),
  async (req, res) => {
    const { itemName, itemDescription, itemType } = req.body;

    const files = req.files as {
      coverImage?: Express.Multer.File[];
      additionalImage?: Express.Multer.File[];
    };

    const coverImage = files.coverImage?.[0]; // ✅ single file
    const additionalImage = files.additionalImage || [];
    try {
      const response = await ItemModel.create({
        itemDescription,
        itemName,
        itemType,
        coverImage: {
          fileName: coverImage?.originalname,
          contentType: coverImage?.mimetype,
          data: coverImage?.buffer,
        },
        additionalImage: additionalImage.map((img) => {
          return {
            fileName: img?.originalname,
            contentType: img?.mimetype,
            data: img?.buffer,
          };
        }),
      });
      res.status(200).json({ message: "Item added to Database" });
    } catch (err) {
      res.status(404).json({ message: "Error adding item in Database" });
    }
  }
);

app.get("/get-data", async (req, res) => {
  try {
    const response = await ItemModel.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Error getting the data" });
  }
});

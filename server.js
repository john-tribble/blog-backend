import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import blogPosts from "./routes/blogPosts.routes.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/blogs", blogPosts);

const DB_CONNECTION = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/test';
const PORT = process.env.PORT || 4000;
//
mongoose
  .connect(DB_CONNECTION)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running at: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
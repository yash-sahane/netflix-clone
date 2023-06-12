import mongoose from "mongoose";
import { app } from "./app.js";
import { connectDB } from "./database/connect.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})
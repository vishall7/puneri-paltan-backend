import mongoose from "mongoose";
import {collections, DB_NAME} from "../constant.js";

let collectionsObj = {};

export const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        const db = dbInstance.connection;
        collectionsObj = {
            [collections.Players]: db.collection(collections.Players),
            [collections.Categories]: db.collection(collections.Categories),
        }
        console.log("Database connected successfully");         
    } catch (error) {
        console.error("something went wrong in the db", error.message);
    }
}

export const getCollection = (collectionName) => collectionsObj[collectionName] || null;
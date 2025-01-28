import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connect.js";
import { insertCategories } from "./controllers/category.controller.js";
import { insertPlayer, insertPlayers } from "./controllers/player.controller.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("something went wrong in the server", error.message);
    }
})(); 
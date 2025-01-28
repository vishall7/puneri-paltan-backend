import { Router } from "express";
import { getAllPlayers, getPlayer, getPlayersByCategory } from "../controllers/player.controller.js";

const router = Router();

router.route("/all-players").get(getAllPlayers);
router.route("/player/:slug").get(getPlayer);

// players according to category

router.route("/category/:id").get(getPlayersByCategory);

export default router;
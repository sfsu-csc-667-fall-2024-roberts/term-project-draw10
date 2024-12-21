import express from "express";
import { Games } from "../db";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
   
    const userId = Number(request.session.user?.id);
    if (!userId) {
      return response.redirect("/login");
    }

    // Fetch available games and the games the user is part of
    const availableGames = await Games.availableGames();
    const playerGames: Record<number, boolean> = await Games.playerGames(userId);

    
    availableGames.forEach((game) => {
      game.currentPlayerIsMember = !!playerGames[game.id];
    });

    // Render the game lobby
    response.render("gamelobby", {
      title: "Welcome",
      availableGames,
    });
  } catch (error) {
    console.error("Error loading game lobby:", error);
    response.status(500).send("Failed to load game lobby");
  }
});

export default router;
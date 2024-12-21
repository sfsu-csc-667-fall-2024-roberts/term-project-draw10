import express, { Request, Response, NextFunction } from "express";
import { Games } from "../db";
import { broadcastGameUpdate, canPlayerDraw, isPlayersTurn } from "./game-middleware";

const router = express.Router();
router.get("/", (_req: Request, res: Response) => {
  res.render("game", { title: "Game" });
});
router.post("/create", async (request, response) => {
  try {
    const userId = Number(request.session.user?.id);
    const game = await Games.create(userId,request.app.get("io"));

    // Notify all connected clients about the new game
    const io = request.app.get("io");
    if (io) {
      io.emit("game-created", {
        id: game.id,
        players: game.players,
        player_count: game.player_count,
      });
    }

    response.redirect(`/game/${game.id}`);
  } catch (error) {
    console.error("Error creating game:", error);
    response.status(500).send("Failed to create game");
  }
});

router.post(
  "/join/:gameId",
  async (request, response, next) => {
    try {
      const gameId = parseInt(request.params.gameId, 10);
      const userId = Number(request.session.user?.id);

      const playerCount = await Games.getPlayerCount(gameId);
      if (playerCount >= 4) {
        request.flash("error", "Game is already full.");
        return response.redirect("/lobby");
      }

      // Add the player to the game
      const game = await Games.join(gameId, userId);

      // Notify all players in the game room
      const io = request.app.get("io");
      if (io) {
        io.to(`game-${gameId}`).emit("player-joined", {
          playerId: userId,
          gameId,
        });
      }

      next();
    } catch (error) {
      console.error("Error joining game:", error);
      response.status(500).send("Failed to join game");
    }
  },
  broadcastGameUpdate,
  (request, response) => {
    const gameId = parseInt(request.params.gameId, 10);
    response.redirect(`/game/${gameId}`);
  },
);

router.get("/:gameId", async (request, response) => {
  try {
    const { gameId } = request.params;
    const userId = Number(request.session.user?.id);

    const game = await Games.get(parseInt(gameId, 10), userId);

    // Join the WebSocket room for real-time updates
    const io = request.app.get("io");
    

    response.render("games/game", {
      title: `Game ${gameId}`,
      gameId,
      game,
      userId,
    });
  } catch (error) {
    console.error("Error loading game details:", error);
    response.status(500).send("Failed to load game details");
  }
});

router.post(
  "/:gameId/draw",
  isPlayersTurn,
  canPlayerDraw,
  async (request, _response, next) => {
    try {
      const gameId = parseInt(request.params.gameId, 10);
      const userId = Number(request.session.user?.id);

      // Handle drawing a card and updating the draw turn
      await Games.drawCard(gameId, userId);
      await Games.updatePlayerDrawTurn(gameId, userId);

      // Notify the game room about the card draw
      const io = request.app.get("io");
      if (io) {
        io.to(`game-${gameId}`).emit("player-draw", {
          playerId: userId,
          gameId,
        });
      }

      next();
    } catch (error) {
      console.error("Error drawing card:", error);
      _response.status(500).send("Failed to draw card");
    }
  },
  broadcastGameUpdate,
  (_request, response) => {
    response.sendStatus(200);
  },
);

router.get("/:gameId/update", broadcastGameUpdate, (_request, response) => {
  response.sendStatus(200);
});

export default router;
import express, { Request, response, Response } from 'express';
import { Games } from "../db";

import {
    broadcastGameUpdate,
    canPlayerDraw,
    isPlayersTurn,
  } from "./game-middleware";

const router = express.Router();

interface JoinGameBody {
  gameId: number;
  playerId: number;
}

interface CreateGameBody {
  playerId: number;
}

interface LaunchGameBody {
  gameId: number;
  playerId: number;
}

// Middleware for input validation
const validateBody = (requiredFields: string[]) => (req: Request, res: Response, next: Function) => {
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }
  next();
};

// Route to get all available games
router.get('/available', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const games = await Games.availableGames(limit, offset);
    res.json({ success: true, games });
  } catch (error) {
    console.error('Error fetching available games:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while fetching available games',
    });
  }
});

router.post(
    "/join/:gameId",
    async (request, response, next) => {
      const gameId = parseInt(request.params.gameId, 10);
     
      const user = request.session.user;
      const userId = Number (request.session.user?.id);
      const playerCount = await Games.getPlayerCount(gameId);
  
      if (playerCount === 2) {
        response.redirect("/lobby");
        return;
      }
  
      await Games.join(gameId, userId);
  
      next();
    },
    broadcastGameUpdate,
    (request, response) => {
      const gameId = parseInt(request.params.gameId, 10);
  
      response.redirect(`/games/${gameId}`);
    },
  );
export default router;

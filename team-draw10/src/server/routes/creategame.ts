import express, { Request, Response, Router } from "express";
import { Server as SocketIOServer } from "socket.io";
import { Games } from "../db";
import { broadcastGameUpdate } from "./game-middleware";

const router = express.Router();
router.get("/", (_req: Request, res: Response,) => {
  res.render("creategame", { title: "Create Game" });
});
router.post("/create", async (request, response, next) => {
  try {
    const userId = Number(request.session.user?.id);

    if (!userId) {
       response.status(401).json({ error: "Unauthorized" });
    }

    const game = await Games.create(userId, request.app.get("io"));
    response.status(201).json({ success: true, gameId: game.id });
    return response.redirect(`/gamelobby`);
    next();
  } catch (error) {
    console.error("Error creating game:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }

   

});

export default router;
import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("gameslist", { name: "games list" });
});

export default router;
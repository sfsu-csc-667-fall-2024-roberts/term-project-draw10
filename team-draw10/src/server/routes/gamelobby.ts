import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("gamelobby", { name: "game lobby" });
});

export default router;
import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("game", { name: "running game" });
});

export default router;
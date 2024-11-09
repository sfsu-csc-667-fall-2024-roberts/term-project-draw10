import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("gameresult", { name: "game results" });
});

export default router;
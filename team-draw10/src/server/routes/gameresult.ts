import express from "express";
const router = express.Router();

router.get("/", (request, response, next) => {
    try {
        // Render the game results page with a dynamic title
        response.render("gameresult", { title: "Game Results", name: "Game Results" });
    } catch (error) {
        console.error("Error rendering game results page:", error);
        response.status(500).send("An error occurred while loading the game results page.");
    }
});

export default router;


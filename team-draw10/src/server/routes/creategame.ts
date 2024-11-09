import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("creategame", { name: "create game" });
});

export default router;
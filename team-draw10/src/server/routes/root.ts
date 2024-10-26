import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("root", { name: "Draw10's site" });
});

export default router;

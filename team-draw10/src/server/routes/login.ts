import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("login", { name: "Log In" });
});

export default router;
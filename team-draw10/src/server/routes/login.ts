import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("login", { name: "log in" });
});

export default router;
import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("signup", { name: "sign up" });
});

export default router;

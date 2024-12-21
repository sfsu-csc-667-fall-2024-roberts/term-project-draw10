import express from "express";
import { Users } from "../db";

declare module "express-session" {
    interface SessionData {
      user?: {
        id: Number;
        username: string;
        email: string;
     
      };
    }
  }

const router = express.Router();


router.get("/register", (_request, response) => {
    response.render("auth/register", { title: "Auth: Register" });
});
router.get("/login", (_request, response) => {
    response.render("auth/login", { title: "Auth: Logout" });
});

router.post("/register", async (request, response) => {
    const { username, email, password } = request.body;
    try {
        const user = await Users.register(username, email, password);
        request.session.user = user;
        response.redirect("/creategame");
    } catch (error) {
        console.error(error);
        request.flash("error", "Failed to register user");
        response.redirect("/auth/register");
    }
});
router.post("/login", async (request, response) => {
    const {email, password } = request.body;
    try {
        const user = await Users.login(email, password);  
        if (user) {
            request.session.user = {
              id: user.id,
              username: user.username,
              email: user.email,
            };
          
       
        response.redirect("/creategame");
    } 
    }catch (error) {
        console.error(error);
        request.flash("error", error as string);
        response.redirect("/auth/login");
    }
});
router.get("/logout", (request, response) => {
    
        response.redirect("/");
    
});
export default router;

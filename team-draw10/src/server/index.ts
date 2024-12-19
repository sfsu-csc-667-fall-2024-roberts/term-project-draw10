import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";
import { createServer } from "http";

dotenv.config();


import * as configuration from "./config/manifest";
import * as routes from "./routes/routemanifest";
import * as middleware from "./middleware";

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

configuration.configureLiveReload(app, staticPath);
configuration.configureSocketID(
  server,
  app,
  configuration.configureSession(app),
);

app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server",
"views"));
app.set("view engine", "ejs");

app.use(middleware.chat);

app.use("/", routes.root);
app.use("/auth", routes.auth);
app.use("/gameslist", routes.gameslist);
app.use("/creategame", middleware.authentication, routes.creategame);
app.use("/gamelobby", middleware.authentication, routes.gamelobby);
app.use("/game", middleware.authentication, routes.game);
app.use("/gameresult", routes.gameresult);
app.use("/chats", middleware.authentication, routes.chat);

app.use((_request, _response, next) => {
	next(httpErrors(404));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

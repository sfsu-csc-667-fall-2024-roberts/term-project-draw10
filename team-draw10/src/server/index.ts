import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";

import * as configuration from "./config/manifest";
import * as routes from "./routes/routemanifest";
import * as middleware from "./middleware/authentication";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src",
"public")));
app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server",
"views"));
app.set("view engine", "ejs");

const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

configuration.configureLiveReload(app, staticPath);
configuration.configureSession(app);

app.use("/", routes.root);
app.use("/auth", routes.auth);
app.use("/gameslist", routes.gameslist);
app.use("/creategame", routes.creategame);
app.use("/gamelobby", routes.gamelobby);
app.use("/game", routes.game);
app.use("/gameresult", routes.gameresult);

app.use((_request, _response, next) => {
	next(httpErrors(404));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";

import connectLiveReload from "connect-livereload";
import livereload from "livereload";

import rootRoutes from "./routes/root";
import loginRoutes from "./routes/login";
import signupRoutes from "./routes/signup";
import gameslistRoutes from "./routes/gameslist";
import creategameRoutes from "./routes/creategame";
import gamelobbyRoutes from "./routes/gamelobby";
import gameRoutes from "./routes/game";
import gameresultRoutes from "./routes/gameresult";


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

app.use("/", rootRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/gameslist", gameslistRoutes);
app.use("/creategame", creategameRoutes);
app.use("/gamelobby", gamelobbyRoutes);
app.use("/game", gameRoutes);
app.use("/gameresult", gameresultRoutes);

const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

if (process.env.NODE_ENV === "development") {
	const reloadServer = livereload.createServer();
	
	reloadServer.watch(staticPath);
	reloadServer.server.once("connection", () => {
		setTimeout(() => {
			reloadServer.refresh("/");
		}, 100);
	});
	app.use(connectLiveReload());
}

app.use((_request, _response, next) => {
	next(httpErrors(404));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

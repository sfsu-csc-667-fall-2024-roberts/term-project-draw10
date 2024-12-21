import dotenv from "dotenv";
import path from "path";
import webpack from "webpack";
import { cardClickHandler } from "./src/client/games/card-click-handler";

dotenv.config();

const mode =
	process.env.NODE_ENV === "production" ?
		"production" : "development";
		
const config: webpack.Configuration = {
	entry: {
		main: path.join(process.cwd(), "src", "client", "main.ts"),
		chat: path.join(process.cwd(), "src", "client", "chat.ts"),
    	game: path.join(process.cwd(), "src", "client", "game.ts"),
    	gamelobby: path.join(process.cwd(), "src", "client", "gamelobby.ts"),
		gameslist: path.join(process.cwd(),"src","client","gameslist.ts"),
		

	},	
	mode,
	output: {
		path: path.join(process.cwd(), "src", "public", "js"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	  },
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
};

export default config;
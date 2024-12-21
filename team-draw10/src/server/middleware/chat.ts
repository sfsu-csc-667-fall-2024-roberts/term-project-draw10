import { NextFunction, Request, Response, response } from "express";
interface SessionData {
    roomId?: number;
    user?: { 
        id: number; 
        username: string;
        email: string; }; 
  }


const chatMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
const gameIdMatch = request.headers.referer?.match(/\/game\/(\d+)/);
const gameId = parseInt(gameIdMatch ? gameIdMatch[1]: "0");


request.session.roomId = gameId;

if(request.params.gameId !== undefined){
    response.locals.roomId = request.params.gameId;
} else {
    response.locals.roomId = 0;
}

  next();
};

export default chatMiddleware;
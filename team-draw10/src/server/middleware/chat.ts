import { NextFunction, Request, Response, response } from "express";

const chatMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
const gameIdMatch = request.headers.referer?.match(/\/game\/(\d+)/);
const gameId = parseInt(gameIdMatch ? gameIdMatch[1]: "0");

//@ts-expect-error TODO figure out the typing session on request
request.session.roomId = gameId;

if(request.params.gameId !== undefined){
    response.locals.roomId = request.params.gameId;
} else {
    response.locals.roomId = 0;
}

  next();
};

export default chatMiddleware;
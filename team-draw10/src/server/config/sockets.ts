
import { Server } from "http";
import type {Express, RequestHandler} from "express";
import {Server as SocketIoServer, Socket} from "socket.io";
import type { SessionData } from 'express-session';

declare module 'http' {
    interface IncomingMessage {
      session: SessionData & {
        user?: { id: string };
        roomId?: string;
      };
    }
  }

let io: SocketIoServer | undefined;

 const bindSession = async (socket: Socket)=>{
    const {request} = socket
    
    const{
        user:{id: userId} ={},
        roomId
    }=request.session;

    socket.join(`user-${userId}`);
    socket.join(`chat-${roomId}`);
    socket.join(`game-${roomId}`);


    socket.use((_, next) =>{ 
        //@ts-expect-error TODO figure out the typing for the session on request
        request.session.reload((error)=>{
            if (error){
                socket.disconnect();
             }else{
                next();
            }

        })
            
    });
};

export default function (server: Server, app: Express, sessionMiddleware:RequestHandler): SocketIoServer {
    if (io == undefined){
        io = new SocketIoServer(server);
        app.set("io", io);
        io.engine.use(sessionMiddleware);
        io.on("connection", async (socket)=>{
            await bindSession(socket);
            //@ts-expect-error TODO figure out the typing for the session on request
            console.log(`client connect (${socket.request.session.id})`)
            
            socket.on ("disconnect", ()=>{
                //@ts-expect-error TODO figure out the typing for the session on request
                console.log(`client disconnected (${socket.request.session.id})`)
                });
            });

    
    }    
return io;
}
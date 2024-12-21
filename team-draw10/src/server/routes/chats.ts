import express, { response } from "express";



const router = express.Router();

router.post("/:roomId", (request, response)=>{
    const { roomId }  = request.params;
    const { message } = request.body;

    const user = request.session.user;
    const email = user?.email;
    request.app.get("io").to(`game=${roomId}`).emit(`message:${roomId}`, {
        message,
       
        sender: email,
        timestamp: new Date(),
    });

    response.status(200).send();
})
export default router;
import {Server} from "socket.io";


let io ;// global socket.io instance

export const initSocket = (server)=>{

    io = new Server(server);

    io.on("connection",(socket)=>{
        console.log("socket connected : ",socket.id);

        // user joins their personal room 
        socket.on("join",(userId)=>{
            socket.join(`user_${userId}`)
            console.log(`user ${userId} joined room : user_${userId}`);
        })

        // when disconnect 
        socket.on("disconnect",(reason)=>{
            console.log("socket disconnected : ",socket.id);
            console.log("disconnect reason : ",reason);
        })
    })

    return io;
}

// funtion to get the io instance anywhere 
export const getIO = ()=>{
    if(!io){
        throw new Error("io instance is not initialized yet !!")
    }
    return io;
}
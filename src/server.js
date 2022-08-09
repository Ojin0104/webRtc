import express from 'express';
import http from "http";
import { WebSocketServer } from 'ws';

const app=express();

app.set("view engine","pug");
app.set("views",__dirname + "/views");
app.use("/public",express.static(__dirname+"/public"));
app.get("/",(req,res)=> res.render("home"));
app.get("/*",(req,res)=>res.redirect("/"));
console.log("hello");
const handleListen=() => console.log('Listening on http://localhost:4000');

const server=http.createServer(app);

const wss=new WebSocketServer({ server} );


const sockets=[];   
function onSocketClose(){
    console.log("close");
}

wss.on("connection",(socket)=>{
    sockets.push(socket);
    console.log("Connected to Browser v");
    socket.on("close",onSocketClose);
    socket.on("message",(message)=>{
        sockets.forEach((aSocket)=> aSocket.send(message.toString('utf8')));
       
    });

  
});


server.listen(4000,handleListen);
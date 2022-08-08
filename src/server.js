import express from 'express';
import http from "http";
import { WebSocketServer } from 'ws';
import path from 'path';
const app=express();
 const __dirname=path.resolve();
app.set("view engine","pug");
app.set("views",__dirname + "/views");
app.use("/public",express.static(__dirname+"/public"));
app.get("/",(req,res)=> res.render("home"));
app.get("/*",(req,res)=>res.redirect("/"));
console.log("hello");
const handleListen=() => console.log('Listening on http://localhost:4000');

const server=http.createServer(app);

const wss=new WebSocketServer({ server} );


   


wss.on("connection",(socket)=>{
    console.log("Connected to Browser v")
    socket.on("close",()=> console.log("Disconnected from the BRowser"));
    socket.on("message",(message)=>{
        console.log(message);
    })
    socket.send("hello!!");
});


server.listen(4000,handleListen);
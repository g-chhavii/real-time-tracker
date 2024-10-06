const express = require('express');
const app = express();
const path = require('path');

// socket io uses http package which is already installed in nodejs
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// setup ejs
app.set("view engine" , "ejs");

// setup express
app.use(express.static('public'));
app.set(express.static(path.join(__dirname, "public")));


io.on("connection" , (socket) => {

    socket.on("send-location" , (data) => {
        io.emit("receive-location" , {id: socket.id, ...data});
    });

    socket.on("disconnect" , ()=>{
        io.emit("user-disconnected" , socket.id);
    });
    
    console.log("connected");  
});

// send response
app.get("/" , (req,res) => {
    res.render("index");
})

// now the server is listening on http 
server.listen(8080);
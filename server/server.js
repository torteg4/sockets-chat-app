
const express = require("express");
const app = express();
const socketio = require('socket.io');
const cors = require("cors")
const port = 8000;

app.use(cors())

const server = app.listen(port, () => console.log("Listening on port", port))

// io is going to represent a server that has sockets attached to it
// when you see origin, it means the IP your connected too
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("New socket:", socket.id);
    console.log("Established socket on the server");
    
    // this is like key value pairs. the key is going to be w/e you name the event ('message_from_client"), and the value it receives will be a callback
    socket.on("message_from_client", (data) => {
        console.log("Data from client", data);
        // not a callback when you're emitting. Think about it like, the data will be passed into the fucntion on our listener
        // using io.emit broadcasts to all sockets, vs socket.broadcast is to all sockets aside from current cllient
    io.emit("data_returned_from_server", data)
    })


})
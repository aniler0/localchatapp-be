import * as express from "express";
import * as http from "http";
import { Server, Socket } from "socket.io";

import route from "./route";
import { addUser, getUser } from "./users";

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
//when we connect frontend and backend to eachother io.on runs
io.on("connection", (socket: Socket) => {
  console.log("We have a new connection!");

  //socket.on is used to catch emits that came from frontend
  socket.on("join", ({ name, room }, callback) => {
    //we add user inside of our user object with addUser method which returns error and user
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    //socket.emit is used to emit a object to the frontend
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    //socket.broadcast sends a messages to user's room, everyone in this room can see messages besides specific user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name},has joined!` });

    socket.join(user.room);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server has started on localhost:${PORT}`);
});

app.use(route);

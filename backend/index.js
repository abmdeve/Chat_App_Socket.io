import { createServer } from "http";
import { Server } from "socket.io";
import { express } from "express"

// const express = require("express");
const app = express();
// const http = require("http").createServer(app);
const cors = require("cors");

const httpServer = createServer()

// const socketIO = require("socket.io")(http, {
//   cors: {
//     origin: "http://10.0.2.2:3000",
//   },
// });

const socketIO = new
 Server(httpServer, {
  cors: {
    origin: "http://10.0.2.2:3000",
  },
});

const PORT = 4000;

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

let chatGroups = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} USER IS JUST CONNECTED ${socket}`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatGroups);
  });

  socket.on("createNewGroup", (currentGroupName) => {
    console.log("currentGroupName", currentGroupName);

    chatGroups.unshift({
      id: chatGroups.length + 1,
      currentGroupName,
      messages: [],
    });
    socket.emit("groupList", chatGroups);
  });

  socket.on("findGroup", (id) => {
    const filteredGroup = chatGroups.filter((item) => item.id === id);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });

  socket.on("newChatMessage", (data) => {
    const { currentChatMessage, groupIdentifier, currentUser, timeData } = data;
    const filteredGroup = chatGroups.filter(
      (item) => item.id === groupIdentifier
    );
    const newMessage = {
      id: createUniqueId(),
      text: currentChatMessage,
      currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
    };

    socket
      .to(filteredGroup[0].currentGroupName)
      .emit("groupMessage", newMessage);

    filteredGroup[0].messages.push(newMessage);
    socket.emit("groupList", chatGroups);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });
});

app.get("/api", (req, res) => {
  ƒ;
  console.log("req, res =====> ", req, res);
  res.json({ message: "RECOVER CHATGROUPS", chatGroups });
});

http.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON http://localhost:${PORT}`);
});

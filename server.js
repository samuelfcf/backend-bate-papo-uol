import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import fs from "fs";

const server = express();
server.use(cors());
server.use(express.json());

const database = fs.readFileSync("./database.json");

// buffer to string, string to json.
const users = JSON.parse(database.toString()).users;
const messages = JSON.parse(database.toString()).messages;

const saveData = () => {
  const content = {
    users,
    messages
  }
  fs.writeFileSync("./database.json", JSON.stringify(content));
}

server.get("/participants", (req, res) => {
  res.send(users)
});

server.post("/participants", (req, res) => {
  const participant = req.body;
  if (!participant.name) {
    res.status(400).send("Erro");
  } else {
    const newParticipant = {
      id: users.length + 1,
      name: participant.name,
      lastStatus: Date.now(),
    }
    const newMessage = {
      id: messages.length + 1,
      from: participant.name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: dayjs().format("HH:mm:ss")
    }
    users.push({
      ...newParticipant
    })
    messages.push({
      ...newMessage
    })
    saveData();
    res.status(200).send(newParticipant)
  }
})

server.post("/messages", (req, res) => {
  const { to, text, type } = req.body;
  const from = users.find(user => user.name === req.headers.user)
  if (!from || (!to || !text) || ((type !== "message" && type !== "private_message"))) {
    res.status(400).send("Erro")
  } else {
    const newMessage = {
      id: messages.length + 1,
      from: from.name,
      to: to,
      text: text,
      type: type,
      time: dayjs().format("HH:mm:ss")
    }
    messages.push({ ...newMessage });
    saveData();
    res.status(200).send(newMessage)
  }
})

server.get("/messages", (req, res) => {
  const limit = req.query.limit;
  const userReq = req.headers.user;

  const userExists = users.find(user => user.name === userReq);

  if (!userExists) {
    res.status(400).send("Usuário nao existe")
  }

  const messagesToShow = messages.filter(message => (message.to === userReq || message.from === userReq || message.type === "message"))

  if (!limit) {
    res.status(200).send(messagesToShow)
  } else {
    let limitedMessages = []
    const start = messagesToShow.length - limit
    if (start < 0) {
      res.status(200).send(messagesToShow)
    } else {
      for (let i = start; i < messagesToShow.length; i++) {
        limitedMessages.push(messagesToShow[i])
      }
    }
    res.status(200).send(limitedMessages)
  }
})

server.post("/status", (req, res) => {
  const userReq = req.headers.user;
  const userExists = users.find(user => user.name === userReq)
  if (!userExists) {
    res.status(400).send("usario nao encontrado")
  } else {
    userExists.lastStatus = Date.now()
    saveData();
    res.status(200).send("status atualizado com sucesso")
  }
})

server.listen(4000, () => {
  console.clear();
  console.log("server is running!!!");
})
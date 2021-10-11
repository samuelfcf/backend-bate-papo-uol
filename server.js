import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("OIII")
})

server.listen(4000, () => {
  console.clear();
  console.log("server is running!!!");
})
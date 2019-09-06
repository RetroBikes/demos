import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { MoverRoom } from "./MoverRoom";

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
  server,
  express: app
});

// register your room handlers
gameServer.define('my_room', MoverRoom);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)

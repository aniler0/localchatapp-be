import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

import route from "./route";

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(route);

httpServer.listen(PORT, () => {
  console.log(`Server has started on localhost:${PORT}`);
});

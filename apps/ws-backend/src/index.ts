import ws from "ws";
import jwt from "jsonwebtoken";
import { config } from "@repo/backend-common/config";
const wss = new ws.Server({ port: 8081 });

wss.on("connection", (ws, req) => {
  const url = req.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");

  if (!token) {
    ws.send("Unauthorized");
    ws.close();
    return;
  }

  const decoded = jwt.verify(token, config.jwtSecret ?? "");

  if (!decoded) {
    ws.send("Unauthorized");
    ws.close();
    return;
  }

  ws.send("Connected to the server");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Received message => ${message}`);
  });
});

console.log("Server is running on port 8080");

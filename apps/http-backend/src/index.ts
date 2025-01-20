import express, { Request, Response } from "express";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hii from http-backend");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

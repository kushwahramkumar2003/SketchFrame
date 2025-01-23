import express from "express";
import { login, signup } from "../controllers/auth";
import { createRoom, getRoomBySlug, getRoomChats } from "../controllers/room";
import authMiddleware from "../middlewares/authMiddleware";

const router: express.Router = express.Router();

//@ts-ignore
router.post("/signup", signup);
//@ts-ignore
router.post("/login", login);
//@ts-ignore
router.post("/room", authMiddleware, createRoom);
router.get("/chats/:roomId", getRoomChats);
router.get("/room/:slug", getRoomBySlug);

export default router;

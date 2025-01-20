import express from "express";
import { login, signup } from "../controllers/auth";
import { createRoom, getRoomBySlug, getRoomChats } from "../controllers/room";
import authMiddleware from "../middlewares/authMiddleware";

const router: express.Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/room", authMiddleware, createRoom);
router.get("/chats/:roomId", getRoomChats);
router.get("/room/:slug", getRoomBySlug);

export default router;

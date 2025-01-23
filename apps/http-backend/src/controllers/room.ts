import { CreateRoomSchema } from "@repo/common/types";
import prisma from "@repo/db/client";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  const userId = req?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const room = await prisma.room.create({
    data: {
      slug: data.data.name,
      adminId: userId,
    },
  });
  res.json({
    roomId: room.id,
  });
};

export const getRoomChats = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  console.log(req.params.roomId);
  const messages = await prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res.json({
    messages,
  });
};

export const getRoomBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const room = await prisma.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({
    room,
  });
};

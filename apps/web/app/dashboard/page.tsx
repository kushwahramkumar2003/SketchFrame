"use client";

import { useEffect, useState } from "react";
import { Plus, Users, Clock, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

interface Room {
  id: string;
  name: string;
  createdAt: string;
  lastActive: string;
  participants: number;
}

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("sketchframe_auth_token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/v1/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(response.data.rooms);
    } catch (error) {
      toast.error("Failed to fetch rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewRoom = async () => {
    try {
      const token = localStorage.getItem("sketchframe_auth_token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/rooms",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newRoom = response.data.room;
      router.push(`/canvas/${newRoom.id}`);
    } catch (error) {
      toast.error("Failed to create new room");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={createNewRoom} className="gap-2">
          <Plus className="h-4 w-4" /> New Canvas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.reduce((acc, room) => acc + room.participants, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.length > 0
                ? new Date(
                    Math.max(
                      ...rooms.map((r) => new Date(r.lastActive).getTime())
                    )
                  ).toLocaleDateString()
                : "No activity"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Canvases</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No canvases created yet.</p>
              <Button
                variant="outline"
                onClick={createNewRoom}
                className="mt-4 gap-2"
              >
                <Plus className="h-4 w-4" /> Create your first canvas
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>
                      {new Date(room.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(room.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{room.participants}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/canvas/${room.id}`)}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

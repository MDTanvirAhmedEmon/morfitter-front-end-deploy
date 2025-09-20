"use client";

import { io } from "socket.io-client";

export const socket = io('https://api.morfitter.com/live-chats');
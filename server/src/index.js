import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import parcelRoutes from "./routes/parcel.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import { initSocket } from "./utils/socket.js";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);

// Socket.io init
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
});
initSocket(io);

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Database
await connectDB();

// ------------------
// API ROUTES
// ------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Courier API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/users", userRoutes);

// ------------------
// FRONTEND SERVE (Deploy-ready)
// ------------------

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all: send index.html for frontend routes (except /api/*)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// ------------------
// START SERVER
// ------------------
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`API running on port ${PORT}`));

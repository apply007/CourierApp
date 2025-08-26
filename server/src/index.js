import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import parcelRoutes from "./routes/parcel.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import { initSocket } from "./utils/socket.js";
import path from "path";

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
});
initSocket(io);

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// DB
await connectDB();

app.get("/", (_req, res) => res.send({ ok: true, service: "Courier API" }));

app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("API running on port", PORT));


app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
});
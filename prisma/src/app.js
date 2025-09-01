import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import notesRoutes from "./routes/notes.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";


const app = express();


app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));


app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/notes", notesRoutes);


app.use(notFound);
app.use(errorHandler);


export default app;
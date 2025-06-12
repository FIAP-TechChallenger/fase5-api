//index
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeFirebase } from "@/infra/firebase/firebase-initialize";
import router from "@/infra/http/routes";
import cookieParser from "cookie-parser";

dotenv.config();
initializeFirebase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});

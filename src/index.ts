import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeFirebase } from "./lib/firebase";
import router from "./routes";

dotenv.config();
initializeFirebase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});

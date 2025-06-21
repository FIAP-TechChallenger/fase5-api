import admin from "firebase-admin";
import path from "path";
import fs from "fs";

export function initializeFirebase() {
  if (!admin.apps.length) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

    if (!serviceAccountPath) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_PATH não definida no .env");
    }

    const fullPath = path.resolve(serviceAccountPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Arquivo de credenciais não encontrado: ${fullPath}`);
    }

    try {
      console.log("Inicializando Firebase Admin SDK...");
      const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf8"));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error("Erro ao inicializar Firebase Admin SDK:", error);
      throw error;
    }
  }
}

export { admin };

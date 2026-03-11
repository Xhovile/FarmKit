import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { adminAuth, adminDb } from './server/firebaseAdmin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "1mb" }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post('/api/account/delete', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : '';

      if (!token) {
        return res.status(401).json({ error: 'Missing auth token' });
      }

      const decoded = await adminAuth.verifyIdToken(token);
      const uid = decoded.uid;

      // Delete Firestore profile first
      await adminDb.collection('users').doc(uid).delete();

      // Then delete auth user
      await adminAuth.deleteUser(uid);

      return res.json({ success: true });
    } catch (error: any) {
      console.error('Delete account error:', error);
      return res.status(500).json({
        error: error.message || 'Failed to delete account',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import 'dotenv/config';
import admin from 'firebase-admin';
import firebaseConfig from '../firebase-applet-config.json';

function getServiceAccount() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (json) {
    const parsed = JSON.parse(json);
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key,
    };
  }

  throw new Error(
    'Missing FIREBASE_SERVICE_ACCOUNT_JSON in Codespaces secrets.'
  );
}

let adminApp: admin.app.App | null = null;

function getAdminApp() {
  if (!adminApp) {
    const serviceAccount = getServiceAccount();
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return adminApp;
}

export const adminAuth = () => getAdminApp().auth();
export const adminDb = () => {
  const app = getAdminApp();
  const db = app.firestore();
  if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)') {
    // Note: If using multiple databases, you might need to use getFirestore(app, databaseId)
    // from 'firebase-admin/firestore'. For now, we assume default or handle it here.
  }
  return db;
};

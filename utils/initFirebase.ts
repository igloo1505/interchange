import * as admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCTg3wr-6HSZpNVCDg1rCzYK7sjsQu2or0",
	authDomain: "interchange-e0036.firebaseapp.com",
	projectId: "interchange-e0036",
	storageBucket: "interchange-e0036.appspot.com",
	messagingSenderId: "779077329123",
	appId: "1:779077329123:web:821e2349dd35bedc9c65d6",
	measurementId: "G-QJ6X123T43",
};

// Initialize Firebase

// export const getFireStore = async () => {
// 	admin.initializeApp({
// 		// credential: cert(process.env.GOOGLE_FIRESTORE_CREDENTIALS),
// 		// credential: applicationDefault(),
// 		...firebaseConfig,
// 		credential: admin.credential.cert({
// 			client_email: process.env.FIREBASE_CLIENT_EMAIL,
// 			private_key: process.env.FIREBASE_PRIVATE_KEY,
// 			private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
// 			project_id: process.env.FIREBASE_PROJECT_ID,
// 			auth_uri: process.env.FIREBASE_AUTH_URI,
// 			token_uri: process.env.FIREBASE_TOKEN_URI,
// 			auth_provider_x509_cert_url: process.env.FIREBASE_PROVIDER_CERT_URL,
// 			client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// 			type: "service_account",
// 		}),
// 		databaseURL: "https://diesel-law-a14bf.firebaseio.com",
// 	});
// 	const db = await admin.firestore();
// 	return db;
// };

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			/// @ts-ignore
			privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
		}),
	});
}

const db = admin.firestore();

export { db };

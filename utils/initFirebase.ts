import * as admin from "firebase-admin";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

export const rootStoragePath = "interchange-4d029.appspot.com";
// const firebaseConfig = {
// 	apiKey: "AIzaSyBcpmAHdTDMZMSg6WudXvvn8jwo6HAYXjs",
// 	authDomain: "interchange-4d029.firebaseapp.com",
// 	projectId: "interchange-4d029",
// 	storageBucket: "interchange-4d029.appspot.com",
// 	messagingSenderId: "892414534217",
// 	appId: "1:892414534217:web:f8eae3a34aef798f9f9598",
// 	measurementId: "G-JS9YZMWM4C",
// };

export const initFirebase = () => {
	let app = admin.apps?.length >= 1 ? admin.apps[0] : undefined;
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				/// @ts-ignore
				privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
			}),
			storageBucket: rootStoragePath,
		});
	}
	/// @ts-ignore
	debugger;
	let _storage =
		admin.apps?.length >= 1 ? admin.storage(admin?.apps[0]) : undefined;
	return _storage;
};

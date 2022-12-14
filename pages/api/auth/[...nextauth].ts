import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import clientPromise from "../../../utils/clientPromise";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import {
	refreshAccessToken,
	GOOGLE_AUTHORIZATION_URL,
} from "../../../utils/refreshToken";
import { JWT, JWTOptions } from "next-auth/jwt";
import AllowAccess from "../../../models/AllowAccess";
import "colors";

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			/// @ts-ignore
			clientId: process.env.GOOGLE_CLIENT_ID,
			/// @ts-ignore
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			profile(profile: GoogleProfile) {
				return {
					id: profile.email,
					// email: profile.email,
					...profile,
					// Return all the profile information you need.
					// The only truly required field is `id`
					// to be able identify the account when added to a database
				};
			},
			// authorization: {
			// 	params: {
			// 		prompt: "consent",
			// 		access_type: "offline",
			// 		response_type: "code",
			// 	},
			// },
		}),
	],
	callbacks: {
		async jwt({ token, user, account }: JWT | any) {
			if (account && user) {
				return {
					accessToken: account.access_token,
					email: account.providerAccountId,
					accessTokenExpires: Date.now() + account.expires_at * 1000,
					refreshToken: account.refresh_token,
					user,
				};
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		async session({ session, token, user }) {
			// session.accessToken = token.accessToken;
			session.user = token.user;
			session.email = token.email;
			session.accessToken = token.accessToken;
			session.error = token.error;
			return session;
		},
		async signIn({ user, account, profile, email, credentials }): any {
			let allowable = AllowAccess.find();
			let a = (await allowable).map((m) => m.email.toLowerCase());
			console.log("user: ", user);
			console.log("account: ", account);
			console.log("profile: ", profile);
			console.log("email: ", email);
			console.log("credentials: ", credentials);
			console.log("a: ", a);
			const isAllowedToSignIn =
				["interchangefp@gmail.com", ...a].indexOf(profile.email) >= 0;
			console.log("isAllowedToSignIn: ", isAllowedToSignIn);
			if (isAllowedToSignIn) {
				return true;
			} else {
				return "/";
			}
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	jwt: {
		maxAge: 30 * 24 * 60 * 60,
	},
	// pages: {
	// 	signIn: "/auth/signin",
	// 	signOut: "/auth/signout",
	// 	error: "/auth/error", // Error code passed in query string as ?error=
	// 	verifyRequest: "/auth/verify-request", // (used for check email message)
	// 	newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	// },
	debug: true,
	secret: process.env.NEXTAUTH_SECRET,
	// adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);

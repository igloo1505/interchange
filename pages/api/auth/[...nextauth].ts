import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider, {
	CredentialsProviderType,
} from "next-auth/providers/credentials";
import {
	refreshAccessToken,
	// GOOGLE_AUTHORIZATION_URL,
} from "../../../utils/refreshToken";
import { JWT, JWTOptions } from "next-auth/jwt";
import AccessPermissions, {
	AccessCredentialsInterface,
} from "../../../models/AllowAccess";
import { connectMongo_minimal } from "../../../utils/connectMongo";

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Email",
					type: "text",
					placeholder: "NicholasSt@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					let connected = await connectMongo_minimal();
					if (!connected) {
						console.log("Failed to connect to MongoDB");
						return null;
					}
					let userExists = await AccessPermissions.findOne({
						email: credentials?.username,
					});
					if (!userExists) {
						console.log("User not found");
						return null;
					}
					if (!credentials?.password) {
						console.log("Password not provided to API");
						return null;
					}
					let passwordVerified = await userExists.validatePassword(
						credentials?.password
					);
					if (passwordVerified) {
						let user = userExists.toObject();
						return {
							email: user.email,
							id: user._id,
						};
					}
					return null;
				} catch (error) {
					console.log("error: ", error);
					return null;
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }: JWT | any) {
			if (account && user) {
				// accessToken: account.access_token,
				token.id = user._id || user.id;
				token.email = user.email;
				token.accessTokenExpires = Date.now() + 3600;
			}
			if (token.email === "interchangefp@gmail.com") {
				return token;
			}
			let hasCurrentAccess = await AccessPermissions.findOne({
				email: token.email,
			});
			let hasAccess =
				hasCurrentAccess &&
				Boolean(
					!hasCurrentAccess.autoExpire || hasCurrentAccess.autoExpire > Date.now
				);
			return hasAccess ? token : { user: "no access" };
		},
		async session({ session, token, user }) {
			// session.accessToken = token.accessToken;
			/// @ts-ignore
			session.user = token.user;
			/// @ts-ignore
			session.email = token.email;
			/// @ts-ignore
			session.id = token.id;
			/// @ts-ignore
			session.accessToken = token.accessToken;
			/// @ts-ignore
			session.error = token.error;
			return session;
		},
		/// @ts-ignore
		// async signIn({ user, account, profile, email, credentials }): any {

		// 	let allowable = await AccessPermissions.find();
		// 	let a = allowable.map((m) => m.email.toLowerCase());
		// 	const isAllowedToSignIn =
		// 		/// @ts-ignore
		// 		["interchangefp@gmail.com", ...a].indexOf(profile.email) >= 0;
		// 	// console.log("isAllowedToSignIn: ", isAllowedToSignIn);
		// 	if (isAllowedToSignIn) {
		// 		return true;
		// 	} else {
		// 		return "/";
		// 	}
		// },
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 15,
		updateAge: 60 * 15,
	},
	jwt: {
		maxAge: 60 * 15,
	},
	pages: {
		signIn: "/auth/signin",
	},
	debug: true,
	// secret: process.env.NEXTAUTH_SECRET,
	// adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);

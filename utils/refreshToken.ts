export const refreshAccessToken = async (token) => {
	try {
		const url =
			"https://oauth2.googleapis.com/token?" +
			/// @ts-ignore
			new URLSearchParams({
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			});

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
};

export const GOOGLE_AUTHORIZATION_URL =
	"https://accounts.google.com/o/oauth2/v2/auth?" +
	new URLSearchParams({
		prompt: "consent",
		access_type: "offline",
		response_type: "code",
	});

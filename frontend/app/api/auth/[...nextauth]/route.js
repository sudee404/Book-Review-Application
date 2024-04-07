import NextAuth from "next-auth";
import DjangoProvider from "./django-provider";

function getExpirationDate(exp) {
	const expirationTime = exp * 1000; // Convert from seconds to milliseconds
	return new Date(expirationTime);
}

export const authOptions = {
	// Configure one or more authentication providers
	providers: [DjangoProvider],
	callbacks: {
		async signIn({ user, account }) {
			// Do something with the provider information
			return user;
		},
		async jwt({ token, user }) {
			// Persist the OAuth access_token to the token right after signin
			// Initial sign in
			if (user) {
				token.accessToken = user.token;
				token.user = user.user;
				token.accessTokenExpires = user.exp;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			if (token) {
				session.user = token.user;
				session.accessToken = token.accessToken;
			}
			// pass error when token has expired
			if (
				Date.now() >
				getExpirationDate(
					token?.accessTokenExpires || Date.now() > session.expires
				)
			) {
				session.error =
					"Your session has expired. Please log in again.";
			}

			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/sign-in",
		signOut: "/signout",
		error: "/error",
		verifyRequest: "/sign-in",
		newUser: "/profile",
	},
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
	},
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

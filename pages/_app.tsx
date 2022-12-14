import { Fragment, useEffect, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Listeners from "../components/layout/Listeners";
import store from "../state/store";
import { Raleway } from "@next/font/google";
import LockBodyListener from "../components/layout/LockBodyListener";
import {
	SessionProvider,
	SessionContext,
	SessionProviderProps,
} from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
// TODO: Add SEO in before pushing to production
// import Seo from '../components/layout/Seo';

const raleway = Raleway({
	weight: ["200", "400", "500", "600", "800"],
	style: ["normal", "italic"],
	// subsets: ["latin"],
	variable: "--font-raleway",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${raleway.variable} font-sans`}>
			<Provider store={store}>
				<Listeners />
				<LockBodyListener />
				<Component {...pageProps} />
			</Provider>
		</main>
	);
}

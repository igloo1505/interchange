import { Fragment, useEffect, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Listeners from "../components/layout/Listeners";
import store from "../state/store";
import { Raleway } from "@next/font/google";
import LockBodyListener from "../components/layout/LockBodyListener";
// TODO: Add SEO in before pushing to production
// import Seo from '../components/layout/Seo';
import ReactGA from "react-ga4";

const raleway = Raleway({
	weight: ["200", "400", "500", "600", "800"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	variable: "--font-raleway",
});

export default function App({ Component, pageProps }: AppProps) {
	ReactGA.initialize("G-JS9YZMWM4C");
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

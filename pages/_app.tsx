import { Fragment, useEffect, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import Listeners from "../components/layout/Listeners";
import store from "../state/store";
import { Raleway } from "@next/font/google";


const raleway = Raleway({
	weight: ["200", "400", "600"],
	style: ["normal", "italic"],
	// subsets: ["latin"],
	variable: "--font-raleway",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${raleway.variable} font-sans`}>
			<Provider store={store}>
				<Listeners />
				<Component {...pageProps} />
			</Provider>
		</main>
	);
}

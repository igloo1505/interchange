import React, { Fragment, useEffect, useState } from "react";
import { setDimensions } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { useRouter } from "next/router";
import { setHideRightColumn } from "../../state/actions";

interface ListenersProps {}

export const hideColumnRightPaths = [
	"/hoursandlocation",
	"/admin",
	"/docs",
	"/auth",
];
export const hideNavbarPaths = ["/admin", "/docs", "/auth"];
export const hideColumnRight = (path: string): boolean => {
	// let x =
	return (
		hideColumnRightPaths
			.map((a: string) => path.toLowerCase().startsWith(a))
			.filter((b) => b).length >= 1
	);
};
export const hideNavbar = (path: string): boolean => {
	return (
		hideNavbarPaths
			.map((a: string) => path.toLowerCase().startsWith(a))
			.filter((b) => b).length >= 1
	);
};

const Listeners = ({}: ListenersProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		console.log(router.asPath);
		let shouldHideRightColumn = hideColumnRight(router.asPath) || false;
		dispatch(setHideRightColumn(shouldHideRightColumn));
	}, [router.asPath]);
	const handleDimensions = () => {
		if (typeof window === "undefined") {
			return;
		}
		let em = document.getElementById("navbar-outer-container");
		let right = document.getElementById("column-right-container");
		let d = em?.getBoundingClientRect();
		let navH = 0;
		if (d?.height) {
			navH = em?.style.getPropertyValue("display") === "none" ? 0 : d.height;
		}

		dispatch(
			setDimensions({
				navbar: {
					height: navH,
				},
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
				columnRight: {
					width: right?.getBoundingClientRect().width || 200,
				},
				scrollbar: window.innerWidth - document.documentElement.clientWidth,
			})
		);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		handleDimensions();
		window.addEventListener("resize", handleDimensions);
	}, []);
	return <div></div>;
};

export default Listeners;

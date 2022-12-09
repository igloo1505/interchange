import React, { Fragment, useEffect, useState } from "react";
import { setDimensions } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { useRouter } from "next/router";
import { setHideRightColumn } from "../../state/actions";

interface ListenersProps {}

const Listeners = ({}: ListenersProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		let shouldHideRightColumn = false;
		if (router.asPath === "/HoursAndLocation") {
			shouldHideRightColumn = true;
		}
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

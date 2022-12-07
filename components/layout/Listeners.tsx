import React, { Fragment, useEffect, useState } from "react";
import { setDimensions } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
interface ListenersProps {}

const Listeners = ({}: ListenersProps) => {
	const dispatch = useAppDispatch();
	const handleNavbarHeight = () => {
		if (typeof window === "undefined") {
			return;
		}
		let em = document.getElementById("navbar-outer-container");

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
			})
		);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		handleNavbarHeight();
		window.addEventListener("resize", handleNavbarHeight);
	}, []);
	return <div></div>;
};

export default Listeners;

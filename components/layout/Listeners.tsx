import React, { Fragment, useEffect, useState } from "react";
import { setDimensions } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
interface ListenersProps {}

const Listeners = ({}: ListenersProps) => {
	const dispatch = useAppDispatch();
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

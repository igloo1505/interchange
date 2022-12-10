import React, { useState, useEffect } from "react";
import PageTitle from "../layout/PageTitle";
import gsap from "gsap";

const Volunteer = () => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		animateEntrance();
	}, []);
	return (
		<div className="mx-4 my-3">
			<PageTitle
				title="Volunteer"
				id_underline="volunteer-page-underline"
				id_text="volunteer-page-title"
				extraClasses_underline="scale-x-0"
				extraStyles={{
					transform: "translateX(-100vw)",
				}}
			/>
		</div>
	);
};

export default Volunteer;

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.to("#volunteer-page-underline", {
		scaleX: 1,
		duration: 2,
		transformOrigin: "center",
		ease: "elastic.out(1, 0.6)",
	});
	tl.to(
		"#volunteer-page-title",
		{
			x: 0,
			duration: 1.5,
			ease: "elastic.out(1, 0.8)",
		},
		"-=1.5"
	);
};

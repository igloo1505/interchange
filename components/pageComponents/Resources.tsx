import React, { useState, useEffect } from "react";
import PageTitle from "../layout/PageTitle";
import SubTitle from "../layout/SubTitle";
import Hotline from "../layout/resources/Hotline";
import Online from "../layout/resources/Online";
import Housing from "../layout/resources/Housing";
import BasicNeeds from "../layout/resources/BasicNeeds";
import Healthcare from "../layout/resources/Healthcare";
import Employment from "../layout/resources/Employment";
import gsap from "gsap";

let sendAllMarginBottom = 40;

interface ResourcesProps {}

const handleViewportTrigger = (isInitial?: boolean) => {
	let viewportPortion = isInitial ? 0.0001 : 0.3;
	let sendAll =
		document.body.clientHeight - window.innerHeight - window.scrollY <=
		sendAllMarginBottom;
	let ems = document.getElementsByClassName("resources-item");
	for (let i = 0; i < ems.length; i++) {
		const em: Element | null = ems.item(i);
		if (!em) return;
		let rect = em?.getBoundingClientRect();
		if (
			rect.top -
				(window.screenTop + window.innerHeight * (1 - viewportPortion)) <=
				0 ||
			sendAll
		) {
			/// @ts-ignore
			em.style.transition = "all 0.35s ease-in-out";
			/// @ts-ignore
			em.style.transform = "translateX(0)";
			/// @ts-ignore
			em.style.opacity = "1";
		}
	}
};

const Resources = ({}: ResourcesProps) => {
	useEffect(() => {
		let tl = gsap.timeline();
		tl.to("#resources-title-underline", {
			scaleX: 1,
			duration: 1,
			ease: "elastic.out(1, 0.7)",
		});
		tl.to(
			"#resources-title-text",
			{
				x: 1,
				opacity: 1,
				duration: 2,
				ease: "elastic.out(1, 0.9)",
			},
			"-=0.7"
		);
		// tl.to(
		// 	".resources-item",
		// 	{
		// 		x: 0,
		// 		opacity: 1,
		// 		duration: 0.5,
		// 		stagger: 0.2,
		// 		ease: "power4.out",
		// 	},
		// 	"-=0.75"
		// );
		if (typeof window === "undefined") {
			return;
		}
		handleViewportTrigger(true);
		window.addEventListener("scroll", () => handleViewportTrigger());
	}, []);
	return (
		<div className="mx-4 mt-3 mb-8">
			<PageTitle
				title="Resources"
				id_text="resources-title-text"
				id_underline="resources-title-underline"
				extraClasses_underline="scale-x-0"
				extraStyles={{
					transform: "translateX(-100vw)",
					opacity: 0,
				}}
			/>
			<SubTitle title="Hotlines" />
			<Hotline
				title="Community Info Line"
				description="Child Care, Food, Shelter, Parenting W-2, and other"
				telephone_display="211"
				tel={211}
				noMargin
			/>
			<Hotline
				title="CDC Health Line"
				description="Health issues including STD / AIDS"
				telephone_display="1-800-342-2437"
				tel={18003422437}
			/>
			<Hotline
				title="Domestic Violence Hotline"
				description=""
				telephone_display="1-414-933-2722"
				tel={14149332722}
			/>
			<Hotline
				title="Hope House"
				description="Housing Hotline Homeless Women and Families Only Transitional Housing, referral required."
				telephone_display="1-414-389-3825"
				tel={14143893825}
			/>
			<Hotline
				title="Milwaukee County Mental Health Crisis Line"
				description="Housing Hotline Homeless Women and Families Only Transitional Housing, referral required."
				telephone_display="1-414-259-7222"
				tel={14142597222}
			/>
			<Hotline
				title="Runaway Shelter Hotline"
				description="Youth 11–17 yrs only"
				telephone_display="1-414-647-8200"
				tel={14146478200}
			/>
			<SubTitle title="Online" />
			<Online />
			<SubTitle title="Housing" />
			<Housing />
			<SubTitle title="Basic Needs" />
			<BasicNeeds />
			<SubTitle title="Employment" />
			<Employment />
			<SubTitle title="Healthcare" />
			<Healthcare />
		</div>
	);
};

export default Resources;

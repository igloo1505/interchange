import React, { useState, useEffect } from "react";
import PageTitle from "../components/layout/PageTitle";
import gsap from "gsap";
import SubTitle from "../components/layout/SubTitle";
import ReactGA from "react-ga4";
import VolunteerHighlightSlider from "../components/pageUI/VolunteerHighlightSlider";

interface t_i {
	time: string;
	description: string;
}
interface Opportunity_i {
	day: string;
	data: t_i[];
}

let opportunities: Opportunity_i[] = [
	{
		day: "Mondays",
		data: [
			{
				time: "9am to 12pm",
				description: "Unload shipments, sort food, and stock shelves",
			},
		],
	},
	{
		day: "Tuesdays",
		data: [
			{
				time: "10am to 1pm",
				description: "Unload shipments, sort food, and stock shelves",
			},
			{
				time: "1pm to 4pm",
				description:
					"Prepare pantry to open; welcome and provide food to our guests",
			},
		],
	},
	{
		day: "Wednesdays",
		data: [
			{
				time: "12pm to 3pm",
				description: "Unload shipments, sort food, and stock shelves",
			},
			{
				time: "3pm to 6pm",
				description:
					"Prepare pantry to open; welcome and provide food to our guests",
			},
		],
	},
	{
		day: "Thursdays",
		data: [
			{
				time: "8am to 11:30am",
				description:
					"Prepare pantry to open; welcome and provide food to our guests",
			},
		],
	},
	{
		day: "Fridays",
		data: [
			{
				time: "9am to 12pm",
				description: "Unload shipments, sort food, and stock shelves",
			},
		],
	},
	{
		day: "Saturdays",
		data: [
			{
				time: "8:30am to 11:30am",
				description:
					"Prepare pantry to open; welcome and provide food to our guests",
			},
		],
	},
	{
		day: "2nd and 4th Sundays",
		data: [
			{
				time: "9am to 12pm",
				description:
					"Prepare delivery to St. Mark AME Church; sort food and stock shelves",
			},
		],
	},
];

const Opportunity = ({ item }: { item: Opportunity_i }) => {
	return (
		<div
			className="flex flex-col items-start justify-start mt-3 volunteer-opportunity"
			style={{
				// transform: "translateX(-100vw)",
				// transform: "scale(0, 0)",
				opacity: 0,
			}}
		>
			<div
				className="px-1 font-normal text-primary-700"
				style={{
					borderLeft: "3px solid #0369a1",
				}}
			>
				{item.day}
			</div>
			<div>
				{item.data.map((d, i) => {
					return (
						<div className="mx-2" key={`134adfaf${i}`}>
							<div className="text-primary-600">{d.time}</div>
							<div className="ml-4">{d.description}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Volunteer = () => {
	ReactGA.send({ hitType: "pageview", page: "/volunteer" });
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		animateEntrance();
	}, []);
	return (
		<div className="mx-4 mt-3 mb-8">
			<PageTitle
				title="Volunteer"
				id_underline="volunteer-page-underline"
				id_text="volunteer-page-title"
				extraClasses_underline="scale-x-0"
				extraStyles={{
					transform: "translateX(-100vw)",
				}}
			/>
			<div className="mx-2 mb-2 mt-4 font-thin">
				The Interchange Food Pantry wouldn't be known for serving its guests
				respectfully and connecting them with the high-quality food they need
				without its outstanding volunteers. They help prepare the pantry hours
				before guests arrive. Once guests arrive, volunteers help with greeting
				our guests, intake and assisting guests to select their food.
			</div>
			<div className="mx-2 my-2 font-thin">
				Shifts with an average length of three hours on one of our days of
				operation or prep days can make the difference for Interchange and its
				guests.
			</div>
			<SubTitle title="Volunteer Opportunities" />
			<div>
				{opportunities.map((o, z) => (
					<Opportunity item={o} key={`opportunity-key-${z}`} />
				))}
			</div>
			<div className="mt-2 w-full flex flex-col justify-center items-start">
				<div className="mt-4 font-thin max-w-[980px]">
					Volunteer walk-ins of one or two individuals are welcomed.
				</div>

				<div className="mt-2 font-thin max-w-[980px]">
					Volunteer groups (3+ volunteers): If interested in any of these
					opportunities, leave a message on our contact page for pantry director
					George Neureuther or call the Interchange Food Pantry at{" "}
					<a href="tel:14145512184" className="text-primary-700 font-normal">
						(414) 551-2184
					</a>
					.
				</div>
			</div>
			<VolunteerHighlightSlider />
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
	tl.to(
		".volunteer-opportunity",
		{
			opacity: 1,
			duration: 2.5,
			stagger: 0.15,
			ease: "power3.out",
			// ease: "power3.out",
		},
		"-=1"
	);
};
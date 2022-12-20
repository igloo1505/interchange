import React, { useState, useEffect, Fragment } from "react";
import PageTitle from "../components/layout/PageTitle";
import gsap from "gsap";
import info from "../utils/infoDetails";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { RootState } from "../state/store";
import initialState from "../state/initialState";
import { dayKeys, dayValues } from "../utils/utilityFunctions";
import SubTitle from "../components/layout/SubTitle";
import ReactGA from "react-ga4";
import { connectServerSide } from "../utils/connectMongo";
import Hours, { HoursInterface } from "../models/Hours";
import { GetServerSideProps } from "next";

const connector = connect((state: RootState, props: any) => ({
	global: state.global,
	viewport: state.UI.dimensions.viewport,
}));

const Map = dynamic(
	() => import("../components/general/Map_hoursAndLocation"),
	{
		ssr: false,
	}
);

const Day = ({ dayKey, data }: { dayKey: string; data: any }) => {
	return (
		<div className="flex flex-col items-start justify-start mt-1 ml-2 font-thin">
			<div className="font-medium text-primary-800">
				{dayValues[dayKeys.indexOf(dayKey)]}
			</div>
			<div className="ml-2">{`${data.open} to ${data.close}`}</div>
		</div>
	);
};

const HoursSection = ({
	global,
	fromServerSide,
}: {
	global: typeof initialState.global;
	fromServerSide: { hours: object };
}) => {
	const [_hours, set_hours] = useState(global.hours || {});
	useEffect(() => {
		if (!global?.hours && fromServerSide?.hours) {
			console.log("fromServerSide: ", fromServerSide);
			set_hours(fromServerSide.hours);
		}
	}, [fromServerSide]);
	return (
		<Fragment>
			<SubTitle title="Pantry Hours" />
			<div>
				{_hours &&
					Object.keys(_hours).map((h, i) => {
						return (
							<Day dayKey={h} key={`daily-schedule-${i}`} data={_hours?.[h]} />
						);
					})}
			</div>
		</Fragment>
	);
};

interface HoursAndLocationProps {
	global: typeof initialState.global;
	viewport: typeof initialState.UI.dimensions.viewport;
	data: { hours: object };
}

const HoursAndLocation = connector(
	({ global, viewport, data }: HoursAndLocationProps) => {
		ReactGA.send({ hitType: "pageview", page: "/hoursAndLocation" });
		useEffect(() => {
			if (typeof window === "undefined") {
				return;
			}
			animateEntrance();
		}, []);
		return (
			<div className="mx-4 mt-3 mb-8">
				<PageTitle
					title="Hours & Location"
					id_text="hoursAndLocationTitle"
					id_underline="hoursAndLocationUnderline"
					extraStyles={{
						transform: "translateX(-100vw)",
					}}
					extraClasses_underline="scale-x-0 origin-left"
				/>
				<div className="flex flex-col items-center justify-center md:items-start md:grid-cols-2 md:grid md:gap-3 md:mt-3">
					<div className="w-full mx-4 font-thin text-left md:mx-0">
						<SubTitle title="Pantry Address" />
						<div>{info.address.main.pantry}</div>
						<div>{`${info.city}, ${info.state} ${info.zip}`}</div>
						<div className="my-3">
							The Interchange Food Pantry is located one block west of Water
							Street on Juneau Avenue and Edison Street. The pantry is located
							on the north side of the street inside the Village Church.
						</div>
						{viewport.width >= 768 && <div className="h-[1rem]" />}
						{viewport.width >= 768 && (
							<HoursSection global={global} fromServerSide={data} />
						)}
					</div>
					<Map />
				</div>
				{viewport.width < 768 && (
					<HoursSection global={global} fromServerSide={data} />
				)}
				<div className="w-full flex flex-col justify-start items-start font-thin mt-8">
					<SubTitle title="Interchange guests: What you’ll need at the pantry" />
					<div className="mt-3 mb-2 indent-3">
						The Interchange Food Pantry serves our guests four times per week
						with nutritious and healthy food choices. At the pantry, we will
						need to confirm identifications for all living in your household. We
						ask that if you come for food, please bring these items:
					</div>
					<div className="text-primary-700 font-bold mt-2">Adults</div>
					<ul className="colored-list-bullet">
						<li className="pl-3"> A Government-issued picture ID</li>
						<li className="pl-3"> Proof of address</li>
					</ul>
					<div className="text-primary-700 font-bold mt-2">
						Children under 18 acceptable identifications:
					</div>
					<ul className="colored-list-bullet">
						<li className="pl-3">Social Security card</li>
						<li className="pl-3">Birth Certificate</li>
						<li className="pl-3">WIC folder</li>
						<li className="pl-3">School Report Card</li>
						<li className="pl-3">ForwardHealth Card</li>
					</ul>
				</div>
			</div>
		);
	}
);

export default HoursAndLocation;

const animateEntrance = () => {
	let tl = gsap.timeline({ delay: 0.5 });
	tl.to("#hoursAndLocationTitle", {
		x: 0,
		duration: 1,
		ease: "power3.out",
	});
	tl.to(
		"#hoursAndLocationUnderline",
		{
			scaleX: 1,
			duration: 1,
			ease: "power3.out",
		},
		"-=0.3"
	);
};

export const getServerSideProps: GetServerSideProps<{
	data: any;
}> = async (context) => {
	const { req, res } = connectServerSide(context.req, context.res);
	let hours = await Hours.find().sort({
		createdAt: "asc",
	});
	let _hours = {};
	for (let i = 0; i < dayKeys.length; i++) {
		const k: string = dayKeys[i];
		if (hours[0][k]) {
			/// @ts-ignore
			_hours[k] = {
				/// @ts-ignore
				open: hours[0][k]?.["open"],
				/// @ts-ignore
				close: hours[0][k]?.["close"],
			};
		}
	}
	/// @ts-ignore
	let data: any = {
		hours: _hours
			? Array.isArray(_hours)
				? JSON.parse(JSON.stringify(_hours[0]))
				: JSON.parse(JSON.stringify(_hours))
			: null,
	};
	return {
		props: { data },
	};
};

import React, { useState, useEffect, Fragment } from "react";
import PageTitle from "../layout/PageTitle";
import gsap from "gsap";
import info from "../../utils/infoDetails";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import { dayKeys, dayValues } from "../../utils/utilityFunctions";
import SubTitle from "../layout/SubTitle";

const connector = connect((state: RootState, props: any) => ({
	global: state.global,
	viewport: state.UI.dimensions.viewport,
}));

const Map = dynamic(() => import("../general/Map_hoursAndLocation"), {
	ssr: false,
});

const Day = ({ dayKey, data }: { dayKey: string; data: any }) => {
	console.log("data: ", data);
	return (
		<div className="flex flex-col items-start justify-start mt-1 ml-2 font-thin">
			<div className="font-medium text-primary-800">
				{dayValues[dayKeys.indexOf(dayKey)]}
			</div>
			<div className="ml-2">{`${data.open} to ${data.close}`}</div>
		</div>
	);
};

const HoursSection = ({ global }: { global: typeof initialState.global }) => {
	return (
		<Fragment>
			<SubTitle title="Pantry Hours" />
			<div>
				{global?.hours &&
					Object.keys(global.hours).map((h, i) => {
						return (
							<Day
								dayKey={h}
								key={`daily-schedule-${i}`}
								data={global?.hours?.[h]}
							/>
						);
					})}
			</div>
		</Fragment>
	);
};

interface HoursAndLocationProps {
	global: typeof initialState.global;
	viewport: typeof initialState.UI.dimensions.viewport;
}

const HoursAndLocation = connector(
	({ global, viewport }: HoursAndLocationProps) => {
		useEffect(() => {
			if (typeof window === "undefined") {
				return;
			}
			animateEntrance();
		}, []);
		return (
			<div className="mx-4 my-3">
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
						{viewport.width >= 768 && <HoursSection global={global} />}
					</div>
					<Map />
				</div>
				{viewport.width < 768 && <HoursSection global={global} />}
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

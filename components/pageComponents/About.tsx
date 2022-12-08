import Link from "next/link";
import React, { useState, useEffect } from "react";
import { pageEnum } from "../../utils/utilityFunctions";
import PageTitle from "../layout/PageTitle";
import gsap from "gsap";
interface AboutProps {}
interface SectionProps {
	label?: string;
	content: string;
}

const Section = ({ label, content }: SectionProps) => {
	return (
		<div className="mx-3 mt-2">
			{label && (
				<span className="font-bold rounded text-primary-700">{label}:</span>
			)}{" "}
			{content}
		</div>
	);
};

const bulletPoints = [
	"IFP is a faith-based organization and believes in equity for all who enter our doors.",
	"We now reach out to more children. In 2019 the IFP served on average 458 children per month compared to 35 – 40 when we were a neighborhood pantry.",
	"Diversity at our pantry is in two areas: 1. Our racial look is predominately African Americans (over 50%), Russian (15%), and White (35%) with an increasing number of Hispanics, Asians, and Burmese. The percentages above are an estimate of our racial makeup.",
	"There is no wrong zip-code! In 2019 our monthly average of zip-codes served was 34 out of 38 zip-codes in Milwaukee County. The top five zip codes served are 53202, 53206, 53208, 53209, and 53212 (our neighborhood zip-code along Milwaukee’s North Side).",
	"We are a second food pantry for many of our guests as their need is significantly more than their neighborhood food pantry provides.",
	"Our location in downtown Milwaukee provides easy access for people using the Milwaukee Transit System. Numerous bus routes from all areas of Milwaukee Country operate daily through downtown.",
	"The IFP Reach: In 2019 the IFP served 13,871 guests (monthly average: 1,156) compared to 9,169 guests (monthly average: 764) in 2018 (2018 vs 2019 comparison chart attached with grant). In one year, IFP saw a 51% increase of guests served.",
];

const getInvolved = [
	<li className="list-item">
		<Link href={`/${pageEnum.volunteer}`} className="text-sky-600">
			Volunteering.
		</Link>
	</li>,
	<li>
		<Link href={`/${pageEnum.donate}`} className="text-sky-600">
			Donating
		</Link>{" "}
		food and contributing financially to the operation of the pantry.
	</li>,
	<li>
		Learn more and spread the word about the{" "}
		<Link href={`/${pageEnum.hoursAndLocation}`} className="text-sky-600">
			location, hours,
		</Link>{" "}
		deliveries and mission of one of Milwaukee’s longest-serving ecumenical
		organizations.
	</li>,
];

const About = ({}: AboutProps) => {
	return (
		<div className="mx-4 mt-3 mb-9">
			<PageTitle title="About" id_underline="about-page-title" />
			<Section
				label="The Interchange Food Pantry Mission"
				content="Improve the health and well-being of our guests through nutritious food and compassion."
			/>
			<Section
				label="Our vision"
				content="Feed all guests who enter our door until there is no one at our door."
			/>
			<Section
				label="Structure"
				content="The Interchange Food Pantry (IFP) is a faith-based organization consisting of seven congregations from the East Side of Milwaukee. We are governed by the board of directors, which consists of members of the seven congregations. Our staff consists of the Executive Director (full time) and several part-time employees (office coordinator, pantry assistants and a bookkeeper). The IFP relies heavily on volunteers to help with the day to day operation of the food pantry. We have a core team of 50 plus volunteers who help each week, along with a variety of volunteers helping throughout the year."
			/>
			<Section content="The IFP Guest Choice Program allows our guests to select their food instead of receiving a pre-packed or standard bag of groceries." />
			<Section
				label="Footprint"
				content="In May of 2018, the IFP expanded our services from a neighborhood pantry (lower East Side) to serving the city of Milwaukee. Reasons for our decision:"
			/>
			<ul
				className="flex flex-col items-start justify-center gap-1 mx-5 my-4"
				style={{
					listStyle: "outside",
				}}
			>
				{bulletPoints.map((b, i) => (
					<li key={`about-bullet-${i}`} className="list-item">
						{b}
					</li>
				))}
			</ul>
			<Section content="In operating an emergency food pantry, we are committed to serving those in need without discrimination, regardless of beliefs." />
			<Section content="The IFP began in 1971. Supporting institutions include founding congregations plus organizations that have joined Interchange over the years. Our members are Cathedral Church of All Saints, First Unitarian Society of Milwaukee, Immanuel Presbyterian Church, North Shore Presbyterian Church, St. Paul’s Episcopal Church, Summerfield Methodist Church and Village Church (ELCA)." />
			<Section content="Your support for Interchange will make a difference in the lives of people struggling with hunger and nutritional needs in Milwaukee. We invite you to get involved in Interchange in a number of ways:" />
			<ul
				className="flex flex-col items-start justify-center gap-1 mx-6 mt-4"
				style={{
					listStyle: "outside",
				}}
			>
				{getInvolved.map((g, i) => {
					return g;
				})}
			</ul>
			<Section content="For more information, contact pantry director George Neureuther by using the contact form in the contact section." />
		</div>
	);
};

export default About;

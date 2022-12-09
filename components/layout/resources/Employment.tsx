import React from "react";

const adaResources: JSX.Element[] = [
	<a
		href="/resources/WIOA-Adult-and-DW-Brochure-2022.pdf"
		download
		className="text-primary-700"
	>
		Adult and Dislocated Worker Services (English)
	</a>,
	<a
		href="/resources/WIOA-Spanish-Adult-and-DW-brochure-2021.pdf"
		download
		className="text-primary-700"
	>
		Servicios WIOA Para Trabajadores Adultos Y Desplazados (Spanish)
	</a>,
	<a
		href="/resources/WIOA-Information-Session-Flyer-2022.pdf"
		download
		className="text-primary-700"
	>
		Workforce Innovation and Opportunity Act (WIOA) Information Session Details
	</a>,
	<a
		href="/resources/WIOA-Dislocated-Worker-Postcard-side-2022.pdf"
		download
		className="text-primary-700"
	>
		Workforce Innovation Opportunity Act (WIOA) Dislocated Worker Program
	</a>,
];

interface JobPlaceProps {
	title: string;
	url?: string;
	description?: string;
	phone_display?: string;
	tel?: number;
	address?: string;
	bullets?: string[];
	mapUrl?: string;
}

const JobPlaces: JobPlaceProps[] = [
	{
		title: "Milwaukee Careers Co-Op",
		address: "940 N 23rd",
		url: "https://www.mccjobs.org/",
		mapUrl:
			"https://www.google.com/maps/search/940%20North%2023rd?hl=en&source=opensearch",
		bullets: [
			"Orientation Mon–Thurs 9:00am to Noon, first 10 people only",
			"Be in line at 8:30am",
			"Two forms of Id are required.",
		],
		phone_display: "1-414-936-8260",
		tel: 14149368260,
	},
	{
		title: "Project Return",
		address: "2821 N 4th Street #202",
		mapUrl:
			"https://www.google.com/maps/place/2821+Vel+R.+Phillips+Ave+%23202,+Milwaukee,+WI+53212/@43.0697,-87.916284,17z/data=!3m1!4b1!4m5!3m4!1s0x880519486019cccf:0x6d29d740279cb1b9!8m2!3d43.0697!4d-87.916284?hl=en",
		url: "https://www.projectreturnmilwaukee.org/",
		bullets: [
			"Walk-ins: Tue & Thur, 9:00am–11:30am",
			"For an appointment please call Mon–Fri 9:00am–5:00pm",
		],
		phone_display: "1-414-374-8029",
		tel: 14143748029,
	},
	{
		title: "Vets Place Central",
		address: "3330 W Wells St",
		mapUrl:
			"https://www.google.com/maps/search/3330%20W%20Wells%20Street?hl=en&source=opensearch",
		bullets: [
			"Homeless Veterans Only",
			"Job Training and education services",
			"Monday through Friday, 8:00am – 5:00pm",
		],
		phone_display: "1-414-342-5000",
		tel: 14143425000,
	},
];

const JobPlace = ({ item }: { item: JobPlaceProps }) => {
	return (
		<div className="flex flex-col items-start justify-start gap-1 mt-2">
			{item.url ? (
				<a href={item.url}>
					<div className="text-primary-800">{item.title}</div>
				</a>
			) : (
				<div className="text-primary-800">{item.title}</div>
			)}
			{item.address && (
				/// @ts-ignore
				<a href={item.mapUrl} className="ml-2 text-sm text-primary-500">
					<div>{item.address}</div>
				</a>
			)}
			{item.phone_display && (
				<a
					/// @ts-ignore
					href={item.tel}
					className="ml-2 text-sm leading-tight tracking-tighter text-primary-500"
				>
					<div>{item.phone_display}</div>
				</a>
			)}
			{item.description && (
				<div className="ml-2 font-thin">{item.description}</div>
			)}
			{item.bullets && (
				<ul className="ml-2 font-thin colored-list-bullet">
					{item.bullets.map((b, i) => {
						return <li key={`item-${item.title}-${i}`}>{b}</li>;
					})}
				</ul>
			)}
		</div>
	);
};

const Employment = () => {
	return (
		<div className="flex flex-col items-start justify-start">
			<div className="font-normal text-primary-600">
				Workforce Innovation Opportunity Act Resources
			</div>
			<div className="ml-3">
				<ul className="colored-list-bullet">
					{adaResources.map((a, i) => (
						<li>{a}</li>
					))}
				</ul>
			</div>
			<div>
				{JobPlaces.map((j, i) => {
					return <JobPlace item={j} key={`job-place-${i}`} />;
				})}
			</div>
		</div>
	);
};

export default Employment;

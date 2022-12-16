import React from "react";

interface HealthcareProps {
	title: string;
	url?: string;
	description?: string;
	phone_display?: string;
	tel?: number;
	address?: string;
	bullets?: string[];
	mapUrl?: string;
	hours?: string[];
}
const HealthPlace = ({
	item,
	logResourceClick,
}: {
	item: HealthcareProps;
	logResourceClick: (label: string) => void;
}) => {
	return (
		<div className="flex flex-col items-start justify-start gap-1 mt-2 resources-item">
			{item.url ? (
				<a
					href={item.url}
					onClick={() => item.url && logResourceClick(item.url)}
				>
					<div className="text-primary-800">{item.title}</div>
				</a>
			) : (
				<div className="text-primary-800">{item.title}</div>
			)}
			{item.address && (
				/// @ts-ignore
				<a
					href={item.mapUrl}
					className="ml-2 text-sm text-primary-500"
					onClick={() => item.address && logResourceClick(item.address)}
				>
					<div>{item.address}</div>
				</a>
			)}
			{item.phone_display && (
				<a
					/// @ts-ignore
					href={item.tel}
					className="ml-2 text-sm leading-tight tracking-tighter text-primary-500"
					onClick={() =>
						item.phone_display && logResourceClick(item.phone_display)
					}
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

const healthItems: HealthcareProps[] = [
	{
		title: "Health Care for The Homeless",
		bullets: [
			"Primary Care",
			"Walk-in only",
			"Call Monday through Friday, 8:30am–4:30pm",
		],
		address: "210 W. Capitol Dr",
		mapUrl:
			"https://www.google.com/maps/search/210%20W.%20Capitol%20Drive?hl=en&source=opensearch",
		hours: ["Thur 8:30am–Noon", "Mental Health Care By Appointment only"],
		phone_display: "1-414-374-2400",
		tel: 14143742400,
	},
	{
		title: "Marquette Women and Children's Clinic",
		address: "1216 N 16th St",
		mapUrl:
			"https://www.google.com/maps/search/1216%20N%2016th?hl=en&source=opensearch",
		bullets: ["Uninsured women and children only", "Call first"],
		hours: ["Wednesday 8:00am – Noon", "Thursday 8:00am – Noon"],
		phone_display: "1-414-345-3250",
		tel: 14143453250,
	},
	{
		title: "Milwaukee Women’s Center ",
		bullets: [
			"Women only, single or with children.",
			"Mental and behavioral Health referrals",
			"Must call first",
		],
		hours: [
			"Mon 9:00am – 5:00pm",
			"Tue 9:00am – 5:00pm",
			"Wed 9:00am – 5:00pm",
			"Thur 9:00am – 5:00pm",
			"Fri 9:00am – 5:00pm",
		],
		phone_display: "1-414-272-6199",
		tel: 14142726199,
	},
	{
		title: "Salvation Army",
		address: "1730 North 7th St",
		mapUrl:
			"https://www.google.com/maps/search/1730%20North%207th%20St?hl=en&source=opensearch",
		bullets: ["Homeless and Uninsured only", "Appointments also accepted"],
		hours: [
			"Mon 8:00am – 4:00pm",
			"Tue 8:00 – 11:00am & 1:30pm – 4:00pm",
			"Thurs 1:30pm – 4:00pm",
			"Fri 8:00am – 11:00am",
		],
		phone_display: "1-414-265-6360",
		tel: 14142656360,
	},
	{
		title: "St. Ben's Clinic",
		address: "1027 N 9th St",
		mapUrl:
			"https://www.google.com/maps/search/1027%20North%209th%20Street?hl=en&source=opensearch",
		bullets: [
			"Homeless people from a shelter only",
			"Walk-in: Mon, Wed & Thurs",
			"Appointments are held on Tue & Fri, 12:00pm–2:00pm",
			"Call between 9:00am and 5:00pm, Mon, Wed & Fri",
			"Call between 9:00am – 3:00pm Tue & Thur",
		],
		phone_display: "1-414-765-0606",
		tel: 14147650606,
	},
];

const Healthcare = ({
	logResourceClick,
}: {
	logResourceClick: (label: string) => void;
}) => {
	return (
		<div>
			{healthItems.map((h, i) => (
				<HealthPlace
					item={h}
					key={`healthcare-place-${i}`}
					logResourceClick={logResourceClick}
				/>
			))}
		</div>
	);
};

export default Healthcare;

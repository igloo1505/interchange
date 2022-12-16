import React from "react";

interface ShelterInterface {
	url?: string;
	title: string;
	description?: string;
	bulletPoints?: string[] | JSX.Element[];
	phone_display?: string;
	tel?: number;
	address?: string;
	mapUrl?: string;
}
const shelters: ShelterInterface[] = [
	{
		title: "Casa Maria",
		description: "Women with children only. Call 9:00am – 10:00pm.",
		phone_display: "1-414-344-5745",
		tel: 14143445745,
	},
	{
		title: "Cathedral Center",
		bulletPoints: [
			"In by 7:00pm",
			"Warm Room from December 15, through March 15.",
			"Single Women call first, between 8:00am Midnight",
		],
		phone_display: "1-414-831-0394",
		tel: 14148310394,
		address: "845 N. Van Buren St.",
		mapUrl:
			"https://www.google.com/maps/place/845+N+Van+Buren+St,+Milwaukee,+WI+53202/@43.0424276,-87.9057476,17z/data=!3m1!4b1!4m5!3m4!1s0x8805190624e306cd:0x418595b6cad1039!8m2!3d43.0424276!4d-87.9035589",
	},
	{
		url: "https://www.impactinc.org/",
		title: "Impact inc",
		description: "Families call 211",
		phone_display: "211",
		tel: 211,
	},
	{
		url: "https://www.guesthouseofmilwaukee.org/",
		title: "Guest House of Milwaukee",
		bulletPoints: ["Single men only", "Admission 6:00pm-6:30pm", "Call first"],
		address: "1216 N 13th St",
		phone_display: "1-414-345-3240",
		tel: 14143453240,
		mapUrl:
			"https://www.google.com/maps/place/1216+N+13th+St,+Milwaukee,+WI+53205/@43.0462925,-87.9306515,17z/data=!3m1!4b1!4m5!3m4!1s0x8805197b8865253f:0x5e7559d70f6f3a58!8m2!3d43.0462925!4d-87.9284628",
	},
	{
		title: "Hope House",
		bulletPoints: ["Single men only", "Up to 30 days."],
		address: "209 W. Orchard St",
		phone_display: "1-414-645-2122",
		tel: 14146452122,
		mapUrl:
			"https://www.google.com/maps/search/209%20W.%20Orchard?hl=en&source=opensearch",
	},
	{
		title: "Joy House",
		description: "First time pregnant women and women with children only.",
		phone_display: "1-414-344-3774",
		tel: 14143443774,
	},
	{
		title: "Milwaukee Rescue Mission",
		url: "https://milmission.org/",
		bulletPoints: ["Single men only", "In by 7:00pm"],
		address: "1820 W Wells St.",
		phone_display: "1-414-935-0200",
		tel: 14149350200,
		mapUrl:
			"https://www.google.com/maps/search/1820%20W%20Wells%20St.?hl=en&source=opensearch",
	},
	{
		title: "Milwaukee Womans Center Shelter Hotline",
		description: "Battered women only, single or with children.",
		phone_display: "1-414-671-6140",
		tel: 14146716140,
	},
	{
		url: "https://www.theopengate.org/",
		title: "Open Gate Transitional Housing",
		description: "Homeless men, women and families only",
		phone_display: "1-414-344-7582",
		tel: 14143447582,
	},
	{
		url: "https://www.repairers.org/",
		title: "Repairers of the Breach",
		address: "1335 W. Vliet St.",
		bulletPoints: [
			"Adults only",
			"Day center & resource center",
			"Mon–Sat: 7:00am–4:00pm",
		],
		phone_display: "1-414-934-9305",
		tel: 14149349305,
		mapUrl:
			"https://www.google.com/maps/place/1335+W+Vliet+St,+Milwaukee,+WI+53205/@43.0483714,-87.9296897,17z/data=!3m1!4b1!4m5!3m4!1s0x8805197cbf05bb99:0x5ff3afae9ba859a5!8m2!3d43.0483714!4d-87.9296897?hl=en",
	},
	{
		url: "https://www.salvationarmyusa.org/usn/",
		title: "Salvation Army",
		bulletPoints: [
			"Please call 211 for more information",
			"Single men and women call Mon – Fri: 8:00am–8:30am",
		],
		phone_display: "1-414-265-6360",
		tel: 14142656360,
	},
	{
		url: "https://www.salvationarmyusa.org/usn/",
		title: "Salvation Army - Drug Rehabilitation Center",
		address: "324 N Jackson St",
		bulletPoints: [
			"Adult Men",
			"Christian Based",
			"Utilizes work therapy for the rehabilitation of men with chemical dependency",
		],
		phone_display: "1-414-276-4316",
		tel: 14142764316,
		mapUrl:
			"https://www.google.com/maps/search/324%20North%20Jackson%20St?hl=en&source=opensearch",
	},
	{
		url: "http://www.sojournertruthhouse.org/",
		title: "Sojourner Truth House",
		phone_display: "1-414-933-2722",
		tel: 14149332722,
		description: "Battered women only, single or with children",
	},
	{
		title: "Walkers Point Transitional Housing",
		phone_display: "1-414-933-2722",
		tel: 14149332722,
		description: "Call First. Monday-Friday, 9:00am–5:00pm",
		bulletPoints: [
			<span>
				Insight Housing 18–21 yrs only.{" "}
				<a
					href={`tel:14146725531`}
					className="font-normal leading-snug tracking-tight text-primary-500"
				>
					1-414-672-5531
				</a>
			</span>,
			<span>
				Group Home 16–17 yrs only.{" "}
				<a
					href={`tel:14146721360`}
					className="font-normal leading-snug tracking-tight text-primary-500"
				>
					1-414-672-1360
				</a>
			</span>,
		],
	},
	{
		title: "Vets Place Central",
		url: "http://www.cvivet.org",
		address: "3330 W Wells St",
		bulletPoints: [
			"Homeless Vets only",
			"Intake Mon, Tues, and Thur. 7:00am–10:00am",
			"Call Mon–Fri 8:00am–5:00pm",
		],
		mapUrl:
			"https://www.google.com/maps/search/3330%20W%20Wells%20St?hl=en&source=opensearch",
	},
];

const HousingItem = ({
	item,
	logResourceClick,
}: {
	item: ShelterInterface;
	logResourceClick: (label: string) => void;
}) => {
	return (
		<div className="flex flex-col items-start justify-start gap-1 mt-2 resources-item">
			{item.url ? (
				<a href={item.url}>
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
			{item.bulletPoints && (
				<ul className="ml-2 font-thin colored-list-bullet">
					{item.bulletPoints.map((b, i) => {
						return <li key={`item-${item.title}-${i}`}>{b}</li>;
					})}
				</ul>
			)}
		</div>
	);
};

const Housing = ({
	logResourceClick,
}: {
	logResourceClick: (label: string) => void;
}) => {
	return (
		<div className="flex flex-col items-start justify-start">
			<div className="font-normal text-primary-600">
				US Department of Housing and Urban Development
			</div>
			<div className="ml-3 font-thin resources-item">
				There is information for the homeless and assistance that HUD provides
				to homeless people. Information is available for renters and rent
				assistance that HUD facilitates. Often renters that qualify for
				subsidized housing only pay a fixed percentage of their monthly income
				for their apartment. This amount can be as low as 30% of your monthly
				pay.
			</div>
			<div>
				{shelters.map((s: ShelterInterface, i: number) => (
					<HousingItem
						item={s}
						key={`housing-item-${i}`}
						logResourceClick={logResourceClick}
					/>
				))}
			</div>
		</div>
	);
};

export default Housing;

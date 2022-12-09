import React from "react";

interface BasicItemInterface {
	address?: string;
	phone_display?: string;
	tel?: number;
	title: string;
	mapUrl?: string;
	bullets: string[];
	url?: string;
}
const BasicItem = (item: BasicItemInterface) => {
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

interface BasicNeedsProps {}

const BasicNeeds = ({}: BasicNeedsProps) => {
	return (
		<div>
			<BasicItem
				title="Our Savior Lutheran Church"
				address="3022 W. Wisconsin Ave"
				mapUrl="https://www.google.com/maps/place/3022+W+Wisconsin+Ave,+Milwaukee,+WI+53208/@43.0393007,-87.9523735,17z/data=!3m1!4b1!4m5!3m4!1s0x88051a3545af4941:0xd9ab8c1662bb404a!8m2!3d43.0393007!4d-87.9523735?hl=en"
				phone_display="1-414-342-1522"
				bullets={[
					"(East Door) Job information, phone and newspapers available, hospitality and referrals",
					"Monday to Thursday, 9:30am–3:00pm",
				]}
				tel={14143421522}
			/>
			<BasicItem
				title="St Vincent de Paul"
				url="https://svdpmilw.org/home.aspx"
				phone_display="1-414-462-7837"
				bullets={[
					"Central intake to local Parish for a food and / or clothing request or referral.",
					"9:00am-5:00pm",
				]}
				tel={14144627837}
			/>
		</div>
	);
};

export default BasicNeeds;

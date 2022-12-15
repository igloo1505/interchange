import React from "react";

const listItems = [
	"Should you file for earned income tax credit?",
	"Do you qualify for the Homestead tax credit?",
	"Do you qualify for Badger Care or other health insurance?",
	"Are there nursing home services that you need and qualify for?",
	"Do you need help paying for prescription drugs?",
];

interface OnlineProps {}

const Online = ({}: OnlineProps) => {
	return (
		<div className="mx-3">
			<div className="font-thin resources-item">
				State of Wisconsin “Access” The Access site is a tool that you can use
				to find your Food Share eligibility. There are also other facts that
				come to light as you fill out the form. This is a full fledged service
				as of June 3, 2006. You can apply for many of the services you see in
				this list on Access.
			</div>
			<ul
				className="mt-3 ml-8 colored-list-bullet"
				style={{
					listStyle: "none",
				}}
			>
				{listItems.map((l, i) => {
					return (
						<li
							className="font-thin resources-item"
							key={`online-resource-item-${i}`}
						>
							{l}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Online;

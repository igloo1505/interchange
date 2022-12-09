import React from "react";

const SubTitle = ({
	title,
	id_container = "",
	id_text = "",
	id_underline = "",
}: {
	title: string;
	id_container?: string;
	id_text?: string;
	id_underline?: string;
}) => {
	return (
		<div id={id_container} className="mt-5 mb-3 mr-5 text-2xl w-fit">
			<div
				className="px-2 font-medium text-primary-700"
				style={{
					borderLeft: "2px solid #38bdf8",
				}}
				id={id_text}
			>
				{title}
			</div>
			<div className="w-[120%] h-[2px] bg-primary-400" id={id_underline} />
		</div>
	);
};

export default SubTitle;

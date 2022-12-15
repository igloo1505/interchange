import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";

interface HotlineProps {
	title: string;
	tel: number;
	telephone_display: string;
	description: string;
	noMargin?: boolean;
}

const Hotline = ({
	title,
	tel,
	telephone_display,
	description,
	noMargin,
}: HotlineProps) => {
	return (
		<div
			className="flex flex-col items-start justify-start resources-item"
			style={{
				marginTop: noMargin ? 0 : "1rem",
			}}
		>
			<div className="font-semibold text-primary-800">{title}</div>
			<a href={`tel:${tel}`}>
				<div className="flex flex-row items-center justify-center gap-2 ml-2 text-primary-800">
					<PhoneIcon className="fill-primary-700 h-[0.85rem] w-[0.85rem]" />
					{telephone_display}
				</div>
			</a>
			<div className="ml-4 font-thin">{description}</div>
		</div>
	);
};

export default Hotline;

import clsx from "clsx";
import React from "react";

interface PageTitleProps {
	title: string;
	id_underline?: string;
	id_text?: string;
	extraClasses?: string;
	extraStyles?: object;
	extraClasses_underline?: string;
}

const PageTitle = ({
	title,
	id_underline = "",
	id_text = "",
	extraClasses = "",
	extraStyles = {},
	extraClasses_underline = "",
}: PageTitleProps) => {
	return (
		<div>
			<div
				className={clsx("text-3xl font-thin text-primary-900", extraClasses)}
				style={extraStyles}
				id={id_text}
			>
				{title}
			</div>
			<div
				id={id_underline}
				className={clsx(
					"w-full h-[2px] bg-primary-900 origin-left",
					extraClasses_underline
				)}
			/>
		</div>
	);
};

export default PageTitle;

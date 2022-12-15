import clsx from "clsx";
import React from "react";

interface SubTitleProps {
	text: string;
	withMarginBottom?: boolean;
}

const SubTitle = ({ text, withMarginBottom = true }: SubTitleProps) => {
	return (
		<div
			className={clsx("text-primary-700 text-lg", withMarginBottom && "mb-3")}
		>
			{text}
		</div>
	);
};

export default SubTitle;

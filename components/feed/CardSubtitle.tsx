import React from "react";

interface CardSubtitleProps {
	text: string;
}

const CardSubtitle = ({ text }: CardSubtitleProps) => {
	return (
		<div className="text-primary-600 my-1" style={{ lineHeight: 1 }}>
			{text}
		</div>
	);
};

export default CardSubtitle;

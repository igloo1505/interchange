import React from "react";

interface CardTitleProps {
	text: string;
}

const CardTitle = ({ text }: CardTitleProps) => {
	return (
		<div className="text-primary-800 text-lg" style={{ lineHeight: 1 }}>
			{text}
		</div>
	);
};

export default CardTitle;

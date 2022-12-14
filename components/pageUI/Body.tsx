import React from "react";

interface BodyProps {
	text: string;
}

const Body = ({ text }: BodyProps) => {
	return (
		<div className="text-black rich-text-body">
			<div dangerouslySetInnerHTML={{ __html: text }} />
		</div>
	);
};

export default Body;

import React from "react";

interface BodyProps {
	text: string;
}

const Body = ({ text }: BodyProps) => {
	return (
		<div className="text-black rich-text-body w-full flex flex-col justify-start items-center">
			<div
				dangerouslySetInnerHTML={{ __html: text }}
				style={{
					maxWidth: "min(980px, calc(100% - 2rem))",
				}}
			/>
		</div>
	);
};

export default Body;

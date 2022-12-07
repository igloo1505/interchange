import { FunctionField, FunctionFieldProps, useShowContext } from "react-admin";
import React, { useState, useEffect, Fragment } from "react";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
// interface QuoteFieldProps {
//     source: string;
//     label: string;
// }

const Quote = () => {
	return <span className="text-xl">"</span>;
};

const QuoteField = (props: any) => {
	const [content, setContent] = useState<string>("");
	const showContext = useShowContext();
	useEffect(() => {
		if (showContext.record?.quote?.string) {
			setContent(showContext.record?.quote?.string);
		}
	}, [showContext]);

	return (
		<div className="italic text-center">
			{content.length > 0 && <Quote />}
			{content}
			{content.length > 0 && <Quote />}
		</div>
	);
};

export default QuoteField;

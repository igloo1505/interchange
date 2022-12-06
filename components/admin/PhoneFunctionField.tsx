import { FunctionField, FunctionFieldProps, useShowContext } from "react-admin";
import React, { useState, useEffect, Fragment } from "react";

// interface PhoneFunctionFieldProps {
//     source: string;
//     label: string;
// }

const PhoneFunctionField = (props: Partial<FunctionFieldProps>) => {
	const [_href, set_href] = useState<string | null>(null);
	const showContext = useShowContext();
	console.log("recordContext: in phoneFunction", showContext);
	useEffect(() => {
		if (showContext.record.phone) {
			set_href(`tel:${showContext.record.phone}`);
		}
	}, [showContext]);
	const renderPhone = (r: any) => {
		let p = String(r.phone);
		let country = p.slice(0, 1);
		let zip = p.slice(1, 4);
		let base1 = p.slice(4, 7);
		let base2 = p.slice(7, 11);
		return `${country}-${zip}-${base1}-${base2}`;
	};
	let _props = {
		...props,
		render: renderPhone,
	};
	return (
		<Fragment>
			{_href ? (
				<a href={_href}>
					<FunctionField {..._props} />
				</a>
			) : (
				<FunctionField {..._props} />
			)}
		</Fragment>
	);
};

export default PhoneFunctionField;

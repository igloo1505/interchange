import { FunctionField, FunctionFieldProps, useShowContext } from "react-admin";
import React, { useState, useEffect, Fragment } from "react";

import { HiPhoneArrowUpRight } from "react-icons/hi2";
// interface PhoneFunctionFieldProps {
//     source: string;
//     label: string;
// }

const PhoneFunctionField = (props: Partial<FunctionFieldProps>) => {
	const [_href, set_href] = useState<string | null>(null);
	const showContext = useShowContext();
	console.log("recordContext: in phoneFunction", showContext);
	useEffect(() => {
		console.log("showContext?.record?.phone: ", showContext?.record?.phone);
		if (showContext?.record.phone) {
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
				<a
					href={_href}
					className="flex flex-row items-center justify-start gap-1"
				>
					<HiPhoneArrowUpRight className="fill-primary-600 w-[0.8rem] h-[0.8rem]" />
					<FunctionField {..._props} />
				</a>
			) : (
				<div className="flex flex-row items-center justify-start gap-1">
					<span className="text-[0.75rem] leading-snug">N/A</span>
				</div>
			)}
		</Fragment>
	);
};

export default PhoneFunctionField;

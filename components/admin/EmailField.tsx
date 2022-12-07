import {
	FunctionField,
	TextField,
	TextFieldProps,
	useShowContext,
} from "react-admin";
import React, { useState, useEffect, Fragment } from "react";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";

const EmailFunctionField = (props: Partial<TextFieldProps>) => {
	const [_href, set_href] = useState<string | null>(null);
	const showContext = useShowContext();

	useEffect(() => {
		if (showContext.record.email) {
			set_href(`mailto:${showContext.record.email}`);
		}
	}, [showContext]);
	return (
		<Fragment>
			{_href ? (
				<a
					href={_href}
					className="flex flex-row items-center justify-start gap-1"
				>
					<HiOutlineEnvelopeOpen className="fill-primary-600 stroke-primary-200 w-[0.8rem] h-[0.8rem]" />
					<TextField {...props} />
				</a>
			) : (
				<></>
			)}
		</Fragment>
	);
};

export default EmailFunctionField;

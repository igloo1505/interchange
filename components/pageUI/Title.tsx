import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { getIdFromString } from "../../utils/IdFromString";
import clsx from "clsx";

interface TitleProps {
	text: string;
	url?: string;
	withMarginBottom?: boolean;
}

const Title = ({ text, url, withMarginBottom = true }: TitleProps) => {
	let _idBase = getIdFromString(text);
	useEffect(() => {
		setTimeout(() => {
			let tl = gsap.timeline();
			console.log("_idBase: ", _idBase);
			tl.to(`#title-text-${_idBase}`, {
				opacity: 1,
				duration: 0.75,
				ease: "power3.out",
			});
			tl.to(`#title-underline-${_idBase}`, {
				scaleX: 1,
				duration: 1.5,
				ease: "elastic.out(1, 0.7)",
			});
		}, 1000);
	}, []);
	return (
		<div className={clsx("mt-2 text-2xl", withMarginBottom && "mb-4")}>
			{url ? (
				<a href={url}>
					<div
						className="text-primary-700 font-bold opacity-0"
						id={`title-text-${_idBase}`}
					>
						{text}
					</div>
				</a>
			) : (
				<div
					className="text-primary-700 font-bold opacity-0"
					id={`title-text-${_idBase}`}
				>
					{text}
				</div>
			)}
			<div
				className="w-full bg-primary-600 h-[3px] scale-x-0 origin-left"
				id={`title-underline-${_idBase}`}
			/>
		</div>
	);
};

export default Title;

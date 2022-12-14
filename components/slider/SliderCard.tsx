import React, { useState, useEffect } from "react";
import { FeaturedInterface } from "../../models/Featured";
import gsap from "gsap";
import clsx from "clsx";

export interface SliderCardProps {
	activeIndex: number;
	index: number;
	children: JSX.Element | JSX.Element[] | string | string[];
	count: number;
	isAnimating: boolean;
	setIsAnimating: (val: boolean) => void;
	isHovered: boolean;
	setIsHovered: (val: boolean) => void;
}

const SliderCard = ({
	activeIndex,
	index,
	children,
	count,
	setIsAnimating,
	isHovered,
	isAnimating,
	setIsHovered,
}: SliderCardProps) => {
	// const [isActive, setIsActive] = useState(false);
	const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex);
	const [isInitialRender, setIsInitialRender] = useState(true);
	let _id = `slider-card-${index}`;
	useEffect(() => {
		// debugger;
		const onComplete = () => {
			setLastActiveIndex(activeIndex);
			setIsAnimating(false);
			if (isInitialRender) {
				setIsInitialRender(false);
			}
		};
		// if (isActive) return;
		// setIsActive(true);
		if (isAnimating) return;
		let diffLast = Math.abs(lastActiveIndex % count);
		let diffActive = Math.abs(activeIndex % count);
		if (activeIndex > lastActiveIndex && diffLast === index) {
			setIsAnimating(true);
			sendLeft(_id, isInitialRender, onComplete);
		}
		if (activeIndex < lastActiveIndex && diffLast === index) {
			setIsAnimating(true);
			sendRight(_id, isInitialRender, onComplete);
		}
		if (diffActive === index && lastActiveIndex > activeIndex) {
			setIsAnimating(true);
			// debugger;
			fromLeft(_id, isInitialRender, onComplete);
		}
		if (
			diffActive === index &&
			Boolean(lastActiveIndex < activeIndex || isInitialRender)
		) {
			setIsAnimating(true);
			// debugger;
			fromRight(_id, isInitialRender, onComplete);
		}
		setIsInitialRender(false);
	}, [activeIndex, index]);
	return (
		<div
			className={clsx(
				"w-full h-full bg-primary-700 absolute ",
				isHovered && "sliderCard-hovered"
			)}
			style={{
				transform: `translateX(${index >= 0 ? "100%" : "0"})`,
			}}
			id={_id}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
		</div>
	);
};

export default SliderCard;

const sendLeft = (id: string, isInitial: boolean, onComplete: () => void) => {
	console.log("sendLeft");
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.to(`#${id}`, {
		x: "-100%",
		duration: isInitial ? 0 : 1,
		ease: "elastic.out(1, 0.7)",
		immediateRender: isInitial,
	});
};
const sendRight = (id: string, isInitial: boolean, onComplete: () => void) => {
	console.log("sendRight");
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.to(`#${id}`, {
		x: "100%",
		duration: isInitial ? 0 : 1,
		ease: "elastic.out(1, 0.7)",
		immediateRender: isInitial,
	});
};
const fromRight = (id: string, isInitial: boolean, onComplete: () => void) => {
	console.log("fromRight");
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.fromTo(
		`#${id}`,
		{
			x: "100%",
			duration: isInitial ? 0 : 1,
			ease: "elastic.out(1, 0.7)",
			immediateRender: isInitial,
			delay: 1,
		},
		{
			x: 0,
			duration: isInitial ? 0 : 1,
			ease: "elastic.out(1, 0.7)",
			immediateRender: isInitial,
			delay: 0.25,
		}
	);
};
const fromLeft = (id: string, isInitial: boolean, onComplete: () => void) => {
	console.log("fromLeft");
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.fromTo(
		`#${id}`,
		{
			x: "-100%",
			duration: isInitial ? 0 : 1,
			ease: "elastic.out(1, 0.7)",
			immediateRender: isInitial,
			delay: 1,
		},
		{
			x: 0,
			duration: isInitial ? 0 : 1,
			ease: "elastic.out(1, 0.7)",
			immediateRender: isInitial,
			delay: 0.25,
		}
	);
};

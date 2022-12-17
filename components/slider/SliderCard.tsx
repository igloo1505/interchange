import React, { useState, useEffect } from "react";
import { FeaturedInterface } from "../../models/Featured";
import gsap from "gsap";
import clsx from "clsx";
import { AnimateSlider } from "./Slider";

export interface SliderCardProps {
	activeIndex: number;
	index: number;
	children: JSX.Element | JSX.Element[] | string | string[];
	count: number;
	isAnimating: boolean;
	setIsAnimating: (val: boolean) => void;
	isHovered: boolean;
	setIsHovered: (val: boolean) => void;
	lastActiveIndex: number;
	setLastActiveIndex: (val: number) => void;
	animate: AnimateSlider;
	_id: string;
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
	lastActiveIndex,
	setLastActiveIndex,
	animate,
	_id,
}: SliderCardProps) => {
	console.log("animate: ", animate);
	// const [isActive, setIsActive] = useState(false);
	const [isInitialRender, setIsInitialRender] = useState(true);

	const log = (val: string) => {
		if (index === 0) {
			let diffLast = Math.abs(lastActiveIndex % count);
			let diffActive = Math.abs(activeIndex % count);
			console.log("diffActive: ", diffActive);
			console.log("diffLast: ", diffLast);
			console.log("lastActiveIndex: ", lastActiveIndex);
			console.log("activeIndex: ", activeIndex);
			console.log(`Card 0 ${val}`);
		}
	};
	useEffect(() => {
		// if (isAnimating) return;
		const onComplete = () => {
			setLastActiveIndex(activeIndex);
			setTimeout(() => setIsAnimating(false), 500);
			if (isInitialRender) {
				setIsInitialRender(false);
			}
		};
		let diffLast = Math.abs(lastActiveIndex % count);
		let diffActive = Math.abs(activeIndex % count);
		if (activeIndex > lastActiveIndex && diffLast === index) {
			// if (activeIndex > lastActiveIndex && diffActive !== index) {
			// setIsAnimating(true);
			// sendLeft(_id, isInitialRender, onComplete);
			animate.sendLeft(isInitialRender, onComplete);
			log("setLeft");
		}
		if (activeIndex < lastActiveIndex && diffLast === index) {
			// if (activeIndex < lastActiveIndex && diffActive !== index) {
			// setIsAnimating(true);
			// sendRight(_id, isInitialRender, onComplete);
			animate.sendRight(isInitialRender, onComplete);
			log("sendRight");
		}
		if (diffActive === index && lastActiveIndex > activeIndex) {
			// setIsAnimating(true);
			// debugger;
			// fromLeft(_id, isInitialRender, onComplete);
			animate.fromLeft(isInitialRender, onComplete);
			log("fromLeft");
		}
		if (
			diffActive === index &&
			Boolean(lastActiveIndex < activeIndex || isInitialRender)
		) {
			// setIsAnimating(true);
			// debugger;
			// fromRight(_id, isInitialRender, onComplete);
			animate.fromRight(isInitialRender, onComplete);
			log("fromRight");
		}
		setIsInitialRender(false);
	}, [activeIndex, index]);
	return (
		<div
			className={clsx(
				"w-full h-full absolute",
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

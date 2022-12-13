import React, { useState, useEffect } from "react";
import { FeaturedInterface } from "../../models/Featured";
import gsap from "gsap";

interface FeaturedSlider_cardProps {
	featured: FeaturedInterface;
	activeIndex: number;
	index: number;
}

const FeaturedSlider_card = ({
	featured,
	activeIndex,
	index,
}: FeaturedSlider_cardProps) => {
	const [isActive, setIsActive] = useState(activeIndex === index);
	const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex);
	const [isInitialRender, setIsInitialRender] = useState(true);
	let _id = `featured-slider-card-${index}`;
	useEffect(() => {
		const onComplete = () => setLastActiveIndex(activeIndex);
		if (activeIndex > index) {
			sendLeft(_id, isInitialRender, onComplete);
		}
		if (activeIndex < index) {
			sendRight(_id, isInitialRender, onComplete);
		}
		if (activeIndex === index && lastActiveIndex > index) {
			fromLeft(_id, isInitialRender, onComplete);
		}
		if (activeIndex === index && lastActiveIndex < index) {
			fromRight(_id, isInitialRender, onComplete);
		}
		if (isInitialRender) {
			setIsInitialRender(false);
		}
	}, [activeIndex, index]);
	return (
		<div className="w-full h-full bg-primary-700" style={{}}>
			{featured.title}
		</div>
	);
};

export default FeaturedSlider_card;

const sendLeft = (id: string, isInitial: boolean, onComplete: () => void) => {
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.to(`#${id}`, {
		x: "-100%",
		duration: isInitial ? 0 : 1,
		ease: "elastic.out(1, 0.7)",
		immediateRender: isInitial,
	});
};
const sendRight = (id: string, isInitial: boolean, onComplete: () => void) => {
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.to(`#${id}`, {
		x: "100%",
		duration: isInitial ? 0 : 1,
		ease: "elastic.out(1, 0.7)",
		immediateRender: isInitial,
	});
};
const fromRight = (id: string, isInitial: boolean, onComplete: () => void) => {
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.fromTo(`#${id}`, {}, {});
};
const fromLeft = (id: string, isInitial: boolean, onComplete: () => void) => {
	let tl = gsap.timeline({ onComplete: onComplete });
	tl.fromTo(`#${id}`, {}, {});
};

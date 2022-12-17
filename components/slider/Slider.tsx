import React, { useState, useEffect } from "react";
import SliderCard from "./SliderCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";
import gsap from "gsap";

const anyAnimating = (arr: AnimateSlider[]) => {
	return arr.filter((a) => a.tl.isActive()).length > 0;
};

export class AnimateSlider {
	public id;
	public tl = gsap.timeline();
	constructor(id: string) {
		this.id = id;
	}
	sendLeft(isInitial: boolean, onComplete: () => void | any) {
		this.tl
			.to(`#${this.id}`, {
				x: "-100%",
				zIndex: 1,
				duration: isInitial ? 0 : 1,
				ease: "elastic.out(1, 0.7)",
				immediateRender: isInitial,
			})
			.then(() => onComplete());
	}
	sendRight(isInitial: boolean, onComplete: () => void | any) {
		this.tl
			.to(`#${this.id}`, {
				x: "100%",
				duration: isInitial ? 0 : 1,
				zIndex: 1,
				ease: "elastic.out(1, 0.7)",
				immediateRender: isInitial,
			})
			.then(() => onComplete());
	}
	fromRight(isInitial: boolean, onComplete: () => void | any) {
		this.tl
			.fromTo(
				`#${this.id}`,
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
			)
			.then(() => onComplete());
	}
	fromLeft(isInitial: boolean, onComplete: () => void | any) {
		this.tl
			.fromTo(
				`#${this.id}`,
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
			)
			.then(() => onComplete());
	}
}

interface SliderProps {
	cards: JSX.Element[];
	id?: string;
	infinite?: boolean;
	maxWidth?: string;
	hideButtons?: boolean;
}

const Slider = ({
	cards,
	id = "",
	infinite = true,
	maxWidth,
	hideButtons = false,
}: SliderProps) => {
	let animates = cards.map((c, i) => new AnimateSlider(`slider-card-${i}`));
	const [activeIndex, setActiveIndex] = useState(0);
	const [lastActiveIndex, setLastActiveIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const handleArrowClick = (type: string) => {
		if (isAnimating || anyAnimating(animates)) return;
		if (!infinite) {
			if (type === "forward") {
				setActiveIndex(activeIndex === cards.length - 1 ? 0 : activeIndex + 1);
			}
			if (type === "backward") {
				setActiveIndex(activeIndex === 0 ? cards.length - 1 : activeIndex - 1);
			}
		}
		if (infinite) {
			if (type === "forward") {
				setActiveIndex(activeIndex + 1);
			}
			if (type === "backward") {
				setActiveIndex(activeIndex - 1);
			}
		}
	};
	useEffect(() => {}, [isAnimating]);
	return (
		<div
			className={clsx(
				"w-full overflow-hidden relative",
				isHovered && "slider-hovered"
			)}
			style={{
				maxWidth: maxWidth,
			}}
		>
			<div
				className={clsx(
					"h-[400px] grid w-full overflow-hidden",
					id && "scale-0 opacity-0"
				)}
				id={id}
				// style={{
				// 	// width: cards?.length ? `${cards.length * 100}%` : "100%",
				//     width: "100%",
				// }}
			>
				{cards &&
					cards.map((Card, i, a) => {
						return (
							<SliderCard
								activeIndex={activeIndex}
								index={i}
								count={a.length}
								isAnimating={isAnimating}
								setIsAnimating={setIsAnimating}
								isHovered={isHovered}
								setIsHovered={setIsHovered}
								lastActiveIndex={lastActiveIndex}
								setLastActiveIndex={setLastActiveIndex}
								animate={animates[i]}
								_id={`slider-card-${i}`}
							>
								{Card}
							</SliderCard>
						);
					})}
				{!hideButtons && (
					<ArrowBackIosIcon
						className="absolute cursor-pointer slider-left-arrow"
						style={{
							top: "50%",
							left: "8px",
							transform: "translateY(-50%)",
							fill: "#fff",
							zIndex: 1000,
						}}
						onClick={() => !isAnimating && handleArrowClick("backward")}
					/>
				)}
				{!hideButtons && (
					<ArrowForwardIosIcon
						className="absolute cursor-pointer slider-right-arrow"
						style={{
							top: "50%",
							right: "8px",
							transform: "translateY(-50%)",
							fill: "#fff",
							zIndex: 1000,
						}}
						onClick={() => !isAnimating && handleArrowClick("forward")}
					/>
				)}
			</div>
		</div>
	);
};

export default Slider;

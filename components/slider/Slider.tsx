import React, { useState, useEffect, MouseEvent } from "react";
import { connect } from "react-redux";
import SliderCard, { SliderCardProps } from "./SliderCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";

interface SliderProps {
	cards: JSX.Element[];
	infinite?: boolean;
	maxWidth?: string;
	hideButtons?: boolean;
}

const Slider = ({
	cards,
	infinite = true,
	maxWidth,
	hideButtons = false,
}: SliderProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const handleArrowClick = (type: string) => {
		if (isAnimating) return;
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
	useEffect(() => {
		console.log("activeIndex: ", activeIndex, activeIndex % cards.length);
	}, [activeIndex]);
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
				className="h-[400px] grid w-full"
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
						}}
						onClick={() => handleArrowClick("backward")}
					/>
				)}
				{!hideButtons && (
					<ArrowForwardIosIcon
						className="absolute cursor-pointer slider-right-arrow"
						style={{
							top: "50%",
							right: "8px",
							transform: "translateY(-50%)",
						}}
						onClick={() => handleArrowClick("forward")}
					/>
				)}
			</div>
		</div>
	);
};

export default Slider;

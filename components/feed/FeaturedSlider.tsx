import React, { useState, useEffect, MouseEvent } from "react";
import { connect } from "react-redux";
import { FeaturedInterface } from "../../models/Featured";
import { RootState } from "../../state/store";
import FeaturedSlider_card from "./FeaturedSlider_card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const connector = connect((state: RootState, props) => ({
	featureds: state.global.featuredPosts,
}));

interface FeaturedSliderProps {
	featureds: FeaturedInterface[];
}

const FeaturedSlider = connector(({ featureds }: FeaturedSliderProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const handleArrowClick = (type: string) => {
		if (type === "forward") {
			setActiveIndex(
				activeIndex === featureds.length - 1 ? 0 : activeIndex + 1
			);
		}
		if (type === "backward") {
			setActiveIndex(
				activeIndex === 0 ? featureds.length - 1 : activeIndex - 1
			);
		}
	};
	useEffect(() => {
		console.log("activeIndex: ", activeIndex);
	}, [activeIndex]);
	return (
		<div className="w-full overflow-hidden relative">
			<div
				className="h-[400px] grid"
				style={{
					width: featureds?.length ? `${featureds.length * 100}%` : "100%",
					gridTemplateColumns: featureds?.length
						? `repeat(${featureds.length}, 1fr)`
						: "1fr",
				}}
			>
				{featureds &&
					featureds.map((f, i) => {
						return (
							<FeaturedSlider_card
								featured={f}
								key={`featured-slider-card-${i}`}
								activeIndex={activeIndex}
								index={i}
							/>
						);
					})}
				<ArrowBackIosIcon
					className="absolute cursor-pointer fill-primary-200"
					style={{
						top: "50%",
						left: "8px",
						transform: "translateY(-50%)",
					}}
					onClick={() => handleArrowClick("backward")}
				/>
				<ArrowForwardIosIcon
					className="absolute cursor-pointer fill-primary-200"
					style={{
						top: "50%",
						right: "8px",
						transform: "translateY(-50%)",
					}}
					onClick={() => handleArrowClick("forward")}
				/>
			</div>
		</div>
	);
});

export default FeaturedSlider;

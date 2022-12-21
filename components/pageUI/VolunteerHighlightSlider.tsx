import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import initialState from "../../state/initialState";
import { RootState } from "../../state/store";
import { ImageGalleryScrollingSelector } from "./ImageGallery";
import VolunteerHighlightCard from "./VolunteerHighlightCard";
import { isMobile } from "react-device-detect";

const connector = connect((state: RootState) => ({
	volunteers: state.global.volunteers,
}));

interface VolunteerHighlightSliderProps {
	volunteers: typeof initialState.global.volunteers;
}

const VolunteerHighlightSlider = connector(
	({ volunteers }: VolunteerHighlightSliderProps) => {
		let _volunteers = volunteers
			? volunteers.filter((v) => v.images && v.images.length > 0)
			: [];
		if (!volunteers) {
			console.log("Handle empty volunteers in volunteers highlight container");
			return <Fragment></Fragment>;
		}
		const [activeIndex, setActiveIndex] = useState(0);
		return (
			<div
				className="max-w-full grid h-[400px] mt-3 mb-8 gap-2"
				style={{
					gridTemplateRows: "1fr 80px",
					...(isMobile && { maxHeight: "300px" }),
				}}
			>
				<div className="h-full grid overflow-hidden relative place-items-center">
					{volunteers.map((v, i, a) => (
						<VolunteerHighlightCard
							volunteer={v}
							key={`volunteer-highlight-card-${i}`}
							setActiveIndex={setActiveIndex}
							activeIndex={activeIndex}
							index={i}
							nImages={a.length}
						/>
					))}
				</div>
				{!isMobile && (
					<div className="max-w-full">
						<ImageGalleryScrollingSelector
							activeImageIndex={activeIndex}
							setActiveImageIndex={setActiveIndex}
							/// @ts-ignore
							images={_volunteers.map((v) => {
								if (!v.images) return;
								return v.primaryImageIndex
									? v.images[v.primaryImageIndex]
									: v.images[0];
							})}
						/>
					</div>
				)}
			</div>
		);
	}
);

export default VolunteerHighlightSlider;

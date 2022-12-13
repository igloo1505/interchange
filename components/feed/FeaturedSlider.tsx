import React from "react";
import { connect } from "react-redux";
import { FeaturedInterface } from "../../models/Featured";
import { RootState } from "../../state/store";
import FeaturedSlider_card from "./FeaturedSlider_card";

const connector = connect((state: RootState, props) => ({
	featureds: state.global.featuredPosts,
}));

interface FeaturedSliderProps {
	featureds: FeaturedInterface[];
}

const FeaturedSlider = connector(({ featureds }: FeaturedSliderProps) => {
	return (
		<div className="h-[400px]" style={{
            
        }}>
			{featureds &&
				featureds.map((f, i) => {
					return (
						<FeaturedSlider_card
							featured={f}
							key={`featured-slider-card-${i}`}
						/>
					);
				})}
		</div>
	);
});

export default FeaturedSlider;

import React, { useEffect, useState, Fragment } from "react";
import FeaturedSlider from "../feed/FeaturedSlider";
import Slider from "../slider/Slider";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import { FeaturedInterface } from "../../models/Featured";
import FeaturedSliderCard from "../feed/FeaturedSliderCard";
import Feed from "../feed/Feed";

const connector = connect((state: RootState, props) => ({
	featureds: state.global.featuredPosts,
	props: props,
}));

const Home = connector(({ featureds }: { featureds: FeaturedInterface[] }) => {
	console.log("featureds: ", featureds);
	return (
		<div className="flex flex-col items-center justify-start w-full min-h-full">
			<Slider
				maxWidth={"max(600px, 80%)"}
				cards={
					featureds?.length
						? featureds.map((f, inx) => (
								<FeaturedSliderCard featured={f} index={inx} />
						  ))
						: []
				}
			/>
			<Feed />
		</div>
	);
});

export default Home;

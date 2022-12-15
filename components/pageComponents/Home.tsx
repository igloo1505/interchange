import React, { useEffect, useState, Fragment } from "react";
import FeaturedSlider from "../feed/FeaturedSlider";
import Slider from "../slider/Slider";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import { FeaturedInterface } from "../../models/Featured";
import FeaturedSliderCard from "../feed/FeaturedSliderCard";
import Feed from "../feed/Feed";
import gsap from "gsap";

const connector = connect((state: RootState, props) => ({
	featureds: state.global.featuredPosts,
	props: props,
}));

const Home = connector(({ featureds }: { featureds: FeaturedInterface[] }) => {
	console.log("featureds: ", featureds);
	const [animCancel, setAnimCancel] = useState(null);
	useEffect(() => {
		const interval = setInterval(() => {
			let tl = gsap.timeline({
				onComplete: () => {
					if (animCancel) {
						clearInterval(animCancel);
					}
				},
			});
			tl.to("#main-featured-post-slider", {
				scale: 1,
				opacity: 1,
				duration: 1,
				ease: "elastic.out(1, 0.85)",
			});
			tl.to(`.feed-card-container`, {
				x: 0,
				duration: 1.75,
				ease: "elastic.out(1, 0.9)",
				stagger: 0.15,
			});
		}, 500);

		setAnimCancel(interval);
	}, []);
	return (
		<div className="flex flex-col items-center justify-start w-full min-h-full">
			<Slider
				maxWidth={"max(600px, 80%)"}
				id="main-featured-post-slider"
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

import React, { useEffect, useState, Fragment } from "react";
// import FeaturedSlider from "../feed/FeaturedSlider";
import Slider from "../components/slider/Slider";
import { connect } from "react-redux";
import { RootState } from "../state/store";
import { FeaturedInterface } from "../models/Featured";
import FeaturedSliderCard from "../components/feed/FeaturedSliderCard";
import Feed from "../components/feed/Feed";
import gsap from "gsap";
import ReactGA from "react-ga4";
import store from "../state/store";
import { useAppDispatch } from "../hooks/ReduxHooks";
import { populateEmptyFeed } from "../utils/populateEmptyFeed";
import { populateGlobal } from "../state/actions";
// Serverside stuff
import { globalDataInterface } from "../state/initialState";
import { GetServerSideProps } from "next";
import { dayKeys } from "../utils/utilityFunctions";
import Featured from "../models/Featured";
import Patron from "../models/Patron";
import GeneralPost from "../models/GeneralPost";
import Volunteers from "../models/Volunteer";
import Hours from "../models/Hours";
import { connectServerSide } from "../utils/connectMongo";

const connector = connect((state: RootState, props) => ({
	featureds: state.global.featuredPosts,
	props: props,
}));

const Home = connector(
	({
		featureds,
		data,
	}: {
		featureds: FeaturedInterface[];
		data: globalDataInterface;
	}) => {
		const dispatch = useAppDispatch();
		useEffect(() => {
			let hasFeed =
				store.getState().global?.feed?.data?.length > 0 ? true : false;
			console.log("hasFeed: ", hasFeed);
			/// @ts-ignore
			let feed = populateEmptyFeed(data);
			dispatch(
				/// @ts-ignore
				populateGlobal({
					...data,
					...(!hasFeed && { feed: { ...feed } }),
				})
			);
		}, [data]);
		ReactGA.send({ hitType: "pageview", page: "/" });
		const [animCancel, setAnimCancel] = useState<any>(null);
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
				{featureds && featureds.length >= 1 && (
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
				)}
				<Feed />
			</div>
		);
	}
);

export const getServerSideProps: GetServerSideProps<{
	data: globalDataInterface;
}> = async (context) => {
	const { req, res } = connectServerSide(context.req, context.res);
	let hours = await Hours.find().sort({
		createdAt: "asc",
	});
	let _hours = {};
	for (let i = 0; i < dayKeys.length; i++) {
		const k: string = dayKeys[i];
		if (hours[0][k]) {
			/// @ts-ignore
			_hours[k] = {
				/// @ts-ignore
				open: hours[0][k]?.["open"],
				/// @ts-ignore
				close: hours[0][k]?.["close"],
			};
		}
	}
	let featuredPosts = await Featured.find().sort({
		createdAt: "asc",
	});
	let generalPosts = await GeneralPost.find().sort({
		createdAt: "asc",
	});
	let volunteers = await Volunteers.find().sort({
		createdAt: "asc",
	});
	let patrons = await Patron.find().sort({
		createdAt: "asc",
	});
	/// @ts-ignore
	let data: globalDataInterface = {
		hours: _hours
			? Array.isArray(_hours)
				? JSON.parse(JSON.stringify(_hours[0]))
				: JSON.parse(JSON.stringify(_hours))
			: null,
		featuredPosts: featuredPosts
			? JSON.parse(JSON.stringify(featuredPosts))
			: [],
		generalPosts: generalPosts ? JSON.parse(JSON.stringify(generalPosts)) : [],
		volunteers: volunteers ? JSON.parse(JSON.stringify(volunteers)) : [],
		patrons: patrons ? JSON.parse(JSON.stringify(patrons)) : [],
	};
	return {
		props: { data },
	};
};

export default Home;

import React, { Fragment, useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// import About from "../components/pageComponents/About";
const About = dynamic(() => import("../components/pageComponents/About"), {
	suspense: true,
});
const Contact = dynamic(() => import("../components/pageComponents/Contact"), {
	suspense: true,
});
// import Contact from "../components/pageComponents/Contact";
// import Volunteer from "../components/pageComponents/Volunteer";
const Volunteer = dynamic(
	() => import("../components/pageComponents/Volunteer"),
	{
		suspense: true,
	}
);
//   import Resources from "../components/pageComponents/Resources";
const Resources = dynamic(
	() => import("../components/pageComponents/Resources"),
	{
		suspense: true,
	}
);
// import Donate from "../components/pageComponents/Donate";
const Donate = dynamic(() => import("../components/pageComponents/Donate"), {
	suspense: true,
});
//   import Hours_And_Location from "../components/pageComponents/Hours_And_Location";
const Hours_And_Location = dynamic(
	() => import("../components/pageComponents/Hours_And_Location"),
	{
		suspense: true,
	}
);
import Home from "../components/pageComponents/Home";
import { useRouter } from "next/router";
import WithColumnRight from "../components/layout/WithColumnRight";
import { pageEnum, dayKeys } from "../utils/utilityFunctions";
import Drawer from "../components/layout/Drawer";
import Navbar from "../components/layout/Navbar";
import Toast from "../components/layout/Toast";
import Navbar_mobile from "../components/layout/Navbar_mobile";
import { GetServerSideProps } from "next";
import Hours from "../models/Hours";
import { connectServerSide } from "../utils/connectMongo";
import { populateGlobal } from "../state/actions";
import { useAppDispatch } from "../hooks/ReduxHooks";
import { globalDataInterface } from "../state/initialState";
import ColumnRight from "../components/layout/ColumnRight";
import Featured from "../models/Featured";
import GeneralPost from "../models/GeneralPost";
import Volunteers from "../models/Volunteer";
import Patron from "../models/Patron";
import { populateEmptyFeed } from "../utils/populateEmptyFeed";
import store from "../state/store";

interface ComponentSwitcherInterface {
	path: pageEnum | string | undefined;
	extraProps?: any;
}

const ComponentSwitcher = ({
	path,
	extraProps = {},
}: ComponentSwitcherInterface) => {
	switch (path) {
		case pageEnum.about:
			return (
				<Suspense fallback={`Loading...`}>
					{" "}
					<About {...extraProps} />
				</Suspense>
			);
		case pageEnum.contact:
			return (
				<Suspense fallback={`Loading...`}>
					{" "}
					<Contact {...extraProps} />
				</Suspense>
			);
		case pageEnum.donate:
			return (
				<Suspense fallback={`Loading...`}>
					{" "}
					<Donate {...extraProps} />
				</Suspense>
			);
		case pageEnum.hoursAndLocation:
			return (
				<Suspense fallback={`Loading...`}>
					{" "}
					<Hours_And_Location {...extraProps} />
				</Suspense>
			);
		case pageEnum.resources:
			return (
				<Suspense fallback={`Loading...`}>
					{" "}
					<Resources {...extraProps} />
				</Suspense>
			);
		case pageEnum.volunteer:
			return (
				<Suspense fallback={`Loading...`}>
					{" "}
					<Volunteer {...extraProps} />
				</Suspense>
			);
		default:
			return <Home />;
	}
};

interface LandingProps {
	data: globalDataInterface;
}

const Landing = ({ data }: LandingProps) => {
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
	const router = useRouter();
	const { component } = router.query;
	let _component = Array.isArray(component) ? component[0] : component;
	return (
		<Fragment>
			<Toast />
			<Drawer />
			<Navbar />
			<Navbar_mobile />
			<ColumnRight />
			<WithColumnRight>
				<ComponentSwitcher path={_component as string} />
			</WithColumnRight>
		</Fragment>
	);
};

export default Landing;

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

import React, { Fragment, useEffect } from "react";
import About from "../components/pageComponents/About";
import Contact from "../components/pageComponents/Contact";
import Volunteer from "../components/pageComponents/Volunteer";
import Resources from "../components/pageComponents/Resources";
import Donate from "../components/pageComponents/Donate";
import Hours_And_Location from "../components/pageComponents/Hours_And_Location";
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
			return <About {...extraProps} />;
		case pageEnum.contact:
			return <Contact {...extraProps} />;
		case pageEnum.donate:
			return <Donate {...extraProps} />;
		case pageEnum.hoursAndLocation:
			return <Hours_And_Location {...extraProps} />;
		case pageEnum.resources:
			return <Resources {...extraProps} />;
		case pageEnum.volunteer:
			return <Volunteer {...extraProps} />;
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

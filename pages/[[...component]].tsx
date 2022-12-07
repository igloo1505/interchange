import React from "react";
import About from "../components/pageComponents/About";
import Contact from "../components/pageComponents/Contact";
import Volunteer from "../components/pageComponents/Volunteer";
import Resources from "../components/pageComponents/Resources";
import Donate from "../components/pageComponents/Donate";
import Hours_And_Location from "../components/pageComponents/Hours_And_Location";
import Home from "../components/pageComponents/Home";
import { useRouter } from "next/router";
import WithColumnRight from "../components/layout/WithColumnRight";

export enum pageEnum {
	about = "About",
	contact = "Contact",
	volunteer = "Volunteer",
	donate = "Donate",
	hoursAndLocation = "HoursAndLocation",
	resources = "Resources",
}

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

interface LandingProps {}

const Landing = ({}: LandingProps) => {
	const router = useRouter();
	const { component } = router.query;
	console.log("component: ", component);
	let _component = Array.isArray(component) ? component[0] : component;
	return (
		<WithColumnRight>
			<ComponentSwitcher path={_component as string} />
		</WithColumnRight>
	);
};

export default Landing;

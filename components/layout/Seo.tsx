import React, { Fragment } from "react";
import {
	DefaultSeo,
	DefaultSeoProps,
	LogoJsonLd,
	LogoJsonLdProps,
	LocalBusinessJsonLd,
	LocalBusinessJsonLdProps,
} from "next-seo";

const defaultProps: DefaultSeoProps = {
	title: "Interchange Food Pantry",
	defaultTitle: "Interchange Food Pantry",
	description: "A non-profit food pantry serving the city of Milwaukee.",
	robotsProps: {
		nosnippet: false,
		notranslate: false,
		noimageindex: false,
		noarchive: true,
		maxSnippet: 200,
		maxImagePreview: "standard",
		maxVideoPreview: -1,
	},
	canonical: "https://interchangefoodpantry.org/",
	additionalMetaTags: [
		{
			name: "application-name",
			content: "Interchange Food Pantry",
		},
	],
	openGraph: {
		type: "website",
		url: "https://interchangefoodpantry.org/",
		title: "Interchange Food Pantry",
		description: "Non-profit food pantry serving the city of Milwaukee.",
	},
};

const businessProps: LocalBusinessJsonLdProps = {
	address: "130 E Juneau Ave.",
	type: "Food Pantry",
	description: "Non-profit food pantry serving the city of Milwaukee.",
	url: "https://interchangefoodpantry.org/",
	id: "https://interchangefoodpantry.org/",
	name: "Interchange Food Pantry",
	areaServed: [
		{
			geoMidpoint: {
				latitude: "43.0460936",
				longitude: "-87.9120687",
			},
			geoRadius: "14350",
		},
	],
};

const logoProps: LogoJsonLdProps = {
	logo: "https://interchangefoodpantry.org/icons/favicon.ico",
	url: "https://interchangefoodpantry.org/",
};

const Seo = () => {
	return (
		<Fragment>
			<DefaultSeo {...defaultProps} />
			<LogoJsonLd {...logoProps} />
			<LocalBusinessJsonLd {...businessProps} />
		</Fragment>
	);
};

export default Seo;

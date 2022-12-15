import React, { Fragment } from "react";
import Patron, { PatronInterface } from "../../models/Patron";
import WithColumnRight from "../../components/layout/WithColumnRight";
import ColumnRight from "../../components/layout/ColumnRight";
import Navbar from "../../components/layout/Navbar";
import Navbar_mobile from "../../components/layout/Navbar_mobile";
import { connectServerSide } from "../../utils/connectMongo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ImageSlider from "../../components/general/ImageSlider";
import Title from "../../components/pageUI/Title";
import SubTitle from "../../components/pageUI/SubTitle";
import Location from "../../components/pageUI/Location";
import Body from "../../components/pageUI/Body";
import dynamic from "next/dynamic";
const ShareButtons = dynamic(
	() => import("../../components/pageUI/ShareButtons"),
	{ ssr: false }
);

interface FeaturedPageProps {
	data: PatronInterface;
}

const FeaturedPage = ({ data }: FeaturedPageProps) => {
	return (
		<Fragment>
			<Navbar />
			<Navbar_mobile />
			<ColumnRight />
			<WithColumnRight>
				<div className="px-3">
					<Title text={"Featured Guest"} withMarginBottom={false} />
					{data.name?.first && <SubTitle text={data.name.first} />}
					{data?.images && (
						<ImageSlider
							images={data.images}
							animated={true}
							animatedDelay={1500}
						/>
					)}
					<Body text={data.description} />
					<ShareButtons
						title={`Guest Spotlight: ${
							data.name?.first ? data.name?.first : ""
						}`}
						description={`Guest Spotlight: ${
							data.name?.first ? data.name?.first : ""
						}`}
					/>
				</div>
			</WithColumnRight>
		</Fragment>
	);
};

export default FeaturedPage;

export const getServerSideProps: GetServerSideProps<{
	data: { data: PatronInterface };
}> = async (context: GetServerSidePropsContext) => {
	const { req, res } = connectServerSide(context.req, context.res);
	let _id = context.query.id;
	let featuredGuest;
	if (_id) {
		featuredGuest = await Patron.findById(_id);
	}
	return {
		props: { data: JSON.parse(JSON.stringify(featuredGuest)) },
		...(!featuredGuest && { redirect: "/" }),
	};
};

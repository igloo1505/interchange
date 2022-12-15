import React, { Fragment } from "react";
import Featured, { FeaturedInterface } from "../../models/Featured";
import WithColumnRight from "../../components/layout/WithColumnRight";
import ColumnRight from "../../components/layout/ColumnRight";
import Navbar from "../../components/layout/Navbar";
import Navbar_mobile from "../../components/layout/Navbar_mobile";
import Drawer from "../../components/layout/Drawer";
import Toast from "../../components/layout/Toast";
import { connectServerSide } from "../../utils/connectMongo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ImageSlider from "../../components/general/ImageSlider";
import Title from "../../components/pageUI/Title";
import Location from "../../components/pageUI/Location";
import Body from "../../components/pageUI/Body";
import dynamic from "next/dynamic";
const ShareButtons = dynamic(
	() => import("../../components/pageUI/ShareButtons"),
	{ ssr: false }
);

interface FeaturedPageProps {
	data: FeaturedInterface;
}

const FeaturedPage = ({ data }: FeaturedPageProps) => {
	return (
		<Fragment>
			<Navbar />
			<Toast />
			<Drawer />
			<Navbar_mobile />
			<ColumnRight />
			<WithColumnRight>
				<div className="px-3">
					<Title text={data.title} url={data.url} />
					{data?.location && <Location location={data.location} />}
					{data?.images && (
						<ImageSlider
							images={data.images}
							animated={true}
							animatedDelay={1500}
						/>
					)}
					<Body text={data.description} />
					<ShareButtons title={data.title} description={data.title} />
				</div>
			</WithColumnRight>
		</Fragment>
	);
};

export default FeaturedPage;

export const getServerSideProps: GetServerSideProps<{
	data: { data: FeaturedInterface };
}> = async (context: GetServerSidePropsContext) => {
	const { req, res } = connectServerSide(context.req, context.res);
	let _id = context.query.featured;
	let featuredPost;
	if (_id) {
		featuredPost = await Featured.findById(_id);
	}
	return {
		props: { data: JSON.parse(JSON.stringify(featuredPost)) },
		...(!featuredPost && { redirect: "/" }),
	};
};

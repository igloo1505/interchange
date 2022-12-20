import React from "react";
import Featured, { FeaturedInterface } from "../../models/Featured";
import { connectServerSide } from "../../utils/connectMongo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ImageGallery from "../../components/pageUI/ImageGallery";
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
		<div className="px-3">
			<Title text={data.title} url={data.url} />
			{data?.location && <Location location={data.location} />}
			{data?.images && (
				<div
					className="w-full"
					style={{
						...(data.images && {
							height: data.images.length > 1 ? "400px" : "fit-content",
						}),
					}}
				>
					<ImageGallery
						images={data.images}
						animated={true}
						animatedDelay={1500}
						primaryImageIndex={
							data.primaryImageIndex ? data.primaryImageIndex : 0
						}
					/>
				</div>
			)}
			<Body text={data.description} />
			<ShareButtons title={data.title} description={data.title} />
		</div>
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

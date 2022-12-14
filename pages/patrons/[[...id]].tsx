import React from "react";
import Patron, { PatronInterface } from "../../models/Patron";
import { connectServerSide } from "../../utils/connectMongo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Title from "../../components/pageUI/Title";
import SubTitle from "../../components/pageUI/SubTitle";
import Body from "../../components/pageUI/Body";
import dynamic from "next/dynamic";
import ImageGallery from "../../components/pageUI/ImageGallery";
const ShareButtons = dynamic(
	() => import("../../components/pageUI/ShareButtons"),
	{ ssr: false }
);

interface FeaturedPageProps {
	data: PatronInterface;
}

const FeaturedPage = ({ data }: FeaturedPageProps) => {
	return (
		<div className="px-3">
			<Title text={"Featured Guest"} withMarginBottom={false} />
			{data.name?.first && <SubTitle text={data.name.first} />}
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
			<ShareButtons
				title={`Guest Spotlight: ${data.name?.first ? data.name?.first : ""}`}
				description={`Guest Spotlight: ${
					data.name?.first ? data.name?.first : ""
				}`}
			/>
		</div>
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

import React, { Fragment } from "react";
import GeneralPost, { GeneralPostInterface } from "../../models/GeneralPost";
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
import Image from "next/image";
const ShareButtons = dynamic(
	() => import("../../components/pageUI/ShareButtons"),
	{ ssr: false }
);

interface GeneralPostPageProps {
	data: GeneralPostInterface;
}

const GeneralPostPage = ({ data }: GeneralPostPageProps) => {
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
					{data?.images &&
						(data?.images.length > 1 ? (
							<ImageSlider
								images={data.images}
								animated={true}
								animatedDelay={1500}
							/>
						) : (
							<div>
								<Image
									src={data.images[0].publicUrl}
									alt="Post Image"
									width={900}
									height={900}
									className="w-full h-auto object-contain relative"
									// style={{
									// 	position: "relative !important",
									// }}
								/>
							</div>
						))}
					<Body text={data.description} />
					<ShareButtons title={data.title} description={data.title} />
				</div>
			</WithColumnRight>
		</Fragment>
	);
};

export default GeneralPostPage;

export const getServerSideProps: GetServerSideProps<{
	data: { data: GeneralPostInterface };
}> = async (context: GetServerSidePropsContext) => {
	const { req, res } = connectServerSide(context.req, context.res);
	let _id = context.query.id;
	let generalPost;
	if (_id) {
		generalPost = await GeneralPost.findById(_id);
	}
	return {
		props: { data: JSON.parse(JSON.stringify(generalPost)) },
		...(!generalPost && { redirect: "/" }),
	};
};

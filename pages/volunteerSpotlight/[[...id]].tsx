import React, { Fragment } from "react";
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
import SubTitle from "../../components/pageUI/SubTitle";
import Body from "../../components/pageUI/Body";
import dynamic from "next/dynamic";
import Volunteer, { VolunteerInterface } from "../../models/Volunteer";
import ImageGallery from "../../components/pageUI/ImageGallery";

const ShareButtons = dynamic(
	() => import("../../components/pageUI/ShareButtons"),
	{ ssr: false }
);

interface VolunteerSpotlightPageProps {
	data: VolunteerInterface;
}

const VolunteerSpotlightPage = ({ data }: VolunteerSpotlightPageProps) => {
	return (
		<Fragment>
			<Navbar />
			<Toast />
			<Drawer />
			<Navbar_mobile />
			<ColumnRight />
			<WithColumnRight>
				<div className="px-3">
					<Title text={"Volunteer Spotlight"} withMarginBottom={false} />
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
						title={`Volunteer Spotlight: ${
							data.name?.first ? data.name?.first : ""
						}`}
						description={`Volunteer Spotlight: ${
							data.name?.first ? data.name?.first : ""
						}`}
					/>
				</div>
			</WithColumnRight>
		</Fragment>
	);
};

export default VolunteerSpotlightPage;

export const getServerSideProps: GetServerSideProps<{
	data: { data: VolunteerInterface };
}> = async (context: GetServerSidePropsContext) => {
	const { req, res } = connectServerSide(context.req, context.res);
	let _id = context.query.id;
	let volunteerSpotlight;
	if (_id) {
		volunteerSpotlight = await Volunteer.findById(_id);
	}
	return {
		props: { data: JSON.parse(JSON.stringify(volunteerSpotlight)) },
		...(!volunteerSpotlight && { redirect: "/" }),
	};
};

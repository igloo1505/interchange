import React, { Fragment } from "react";
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
import Volunteer, { VolunteerInterface } from "../../models/Volunteer";

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
			<Navbar_mobile />
			<ColumnRight />
			<WithColumnRight>
				<div className="px-3">
					<Title text={"Volunteer Spotlight"} withMarginBottom={false} />
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

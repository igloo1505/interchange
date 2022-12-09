import React from "react";
import PageTitle from "../layout/PageTitle";
import SubTitle from "../layout/SubTitle";
import Hotline from "../layout/resources/Hotline";
import Online from "../layout/resources/Online";
import Housing from "../layout/resources/Housing";
import BasicNeeds from "../layout/resources/BasicNeeds";
import Healthcare from "../layout/resources/Healthcare";
import Employment from "../layout/resources/Employment";
interface ResourcesProps {}

const Resources = ({}: ResourcesProps) => {
	return (
		<div className="mx-4 mt-3 mb-8">
			<PageTitle title="Resources" />
			<SubTitle title="Hotlines" />
			<Hotline
				title="Community Info Line"
				description="Child Care, Food, Shelter, Parenting W-2, and other"
				telephone_display="211"
				tel={211}
				noMargin
			/>
			<Hotline
				title="CDC Health Line"
				description="Health issues including STD / AIDS"
				telephone_display="1-800-342-2437"
				tel={18003422437}
			/>
			<Hotline
				title="Domestic Violence Hotline"
				description=""
				telephone_display="1-414-933-2722"
				tel={14149332722}
			/>
			<Hotline
				title="Hope House"
				description="Housing Hotline Homeless Women and Families Only Transitional Housing, referral required."
				telephone_display="1-414-389-3825"
				tel={14143893825}
			/>
			<Hotline
				title="Milwaukee County Mental Health Crisis Line"
				description="Housing Hotline Homeless Women and Families Only Transitional Housing, referral required."
				telephone_display="1-414-259-7222"
				tel={14142597222}
			/>
			<Hotline
				title="Runaway Shelter Hotline"
				description="Youth 11–17 yrs only"
				telephone_display="1-414-647-8200"
				tel={14146478200}
			/>
			<SubTitle title="Online" />
			<Online />
			<SubTitle title="Housing" />
			<Housing />
			<SubTitle title="Basic Needs" />
			<BasicNeeds />
			<SubTitle title="Employment" />
			<Employment />
			<SubTitle title="Healthcare" />
			<Healthcare />
		</div>
	);
};

export default Resources;

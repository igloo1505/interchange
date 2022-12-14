import React from "react";
import { VolunteerInterface } from "../../models/Volunteer";
import { sliceText, filterTags } from "../../utils/sliceText";
import CardImage from "./CardImage";
import CardSubtitle from "./CardSubtitle";
import CardTitle from "./CardTitle";
import SeeMore from "./SeeMore";
import { connect } from "react-redux";
import { RootState } from "../../state/store";

const connector = connect((state: RootState, props) => ({
	viewport: state.UI.dimensions.viewport,
}));
interface FeedCard_volunteerProps {
	model: VolunteerInterface;
	viewport: {
		width: number;
		height: number;
	};
	extraStyles: any;
}

const FeedCard_volunteer = connector(
	({ model, viewport, extraStyles }: FeedCard_volunteerProps) => {
		console.log("viewport: ", viewport);
		return (
			<div
				className="w-full grid gap-2 min-h-[200px] sm:max-h-[250px]"
				style={extraStyles.container}
			>
				<div className="flex flex-col justify-start items-start max-h-[250px] overflow-hidden">
					<CardTitle text="Volunteer Spotlight" />
					{model?.name?.first && <CardSubtitle text={model.name.first} />}
					{model.images && model.images?.length > 0 && (
						<CardImage
							imageUrl={model.images[model.primaryImageIndex || 0].publicUrl}
							alt="Volunteer Image"
						/>
					)}
				</div>
				<div className="grid" style={{ gridTemplateRows: "1fr 60px" }}>
					<div className="px-3">
						{sliceText(filterTags({ text: model?.description }), 250)}
					</div>
					<SeeMore
						id={model.id ? model.id : model._id}
						resource="volunteerSpotlight"
					/>
				</div>
			</div>
		);
	}
);

export default FeedCard_volunteer;

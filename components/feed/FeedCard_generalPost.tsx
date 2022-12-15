import React from "react";
import { GeneralPostInterface } from "../../models/GeneralPost";
import { sliceText, filterTags } from "../../utils/sliceText";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";
import SeeMore from "./SeeMore";

interface FeedCard_generalPostProps {
	model: GeneralPostInterface;
	extraStyles: any;
}

const FeedCard_generalPost = ({
	model,
	extraStyles,
}: FeedCard_generalPostProps) => {
	return (
		<div
			className="w-full grid gap-2 min-h-[200px] sm:max-h-[250px]"
			style={extraStyles.container}
		>
			<div className="flex flex-col justify-start items-start max-h-[250px] overflow-hidden">
				<CardTitle text={model.title} />
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
				<SeeMore id={model.id || model._id} resource="post" />
			</div>
		</div>
	);
};

export default FeedCard_generalPost;

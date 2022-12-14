import React, { Fragment } from "react";
import { FeaturedInterface } from "../../models/Featured";
import { GeneralPostInterface } from "../../models/GeneralPost";
import { PatronInterface } from "../../models/Patron";
import { VolunteerInterface } from "../../models/Volunteer";
import FeedCard_generalPost from "./FeedCard_generalPost";
import FeedCard_patron from "./FeedCard_patron";
import FeedCard_volunteer from "./FeedCard_volunteer";
import { useRouter } from "next/router";

interface FeedCardProps {
	model:
		| VolunteerInterface
		| PatronInterface
		| FeaturedInterface
		| GeneralPostInterface
		| any;
}

const FeedCard = ({ model }: FeedCardProps) => {
	const router = useRouter();
	const preloadContent = () => {
		let base =
			model._model === "volunteer"
				? "volunteerSpotlight"
				: model._model === "patron"
				? "patrons"
				: model._model === "generalPost"
				? "post"
				: false;
		let id = model.id || model._id;
		if (!base || !id) return;
		router.prefetch(`/${base}/${id}`);
	};
	return (
		<Fragment>
			{model._model && (
				<div
					className="max-w-full min-h-[200px] max-h-[400px] px-2 py-2 mx-2 my-3 rounded-md shadow-md hover:shadow-sm feed-card-container"
					style={{
						transition: "box-shadow 0.3s ease-in-out",
						border: "1px solid #cbd5e1",
						transform: "translateX(-150%)",
					}}
					onMouseEnter={preloadContent}
				>
					{model._model === "volunteer" && <FeedCard_volunteer model={model} />}
					{model._model === "patron" && <FeedCard_patron model={model} />}
					{model._model === "generalPost" && (
						<FeedCard_generalPost model={model} />
					)}
				</div>
			)}
		</Fragment>
	);
};

export default FeedCard;

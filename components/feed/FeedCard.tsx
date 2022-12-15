import React, { Fragment, useState, useEffect } from "react";
import { FeaturedInterface } from "../../models/Featured";
import { GeneralPostInterface } from "../../models/GeneralPost";
import { PatronInterface } from "../../models/Patron";
import { VolunteerInterface } from "../../models/Volunteer";
import FeedCard_generalPost from "./FeedCard_generalPost";
import FeedCard_patron from "./FeedCard_patron";
import FeedCard_volunteer from "./FeedCard_volunteer";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import initialState from "../../state/initialState";
import { RootState } from "../../state/store";
const CARD_BREAKPOINT = 640;
const connector = connect((state: RootState, props) => ({
	viewport: state.UI.dimensions.viewport,
}));

interface FeedCardProps {
	model:
		| VolunteerInterface
		| PatronInterface
		| FeaturedInterface
		| GeneralPostInterface
		| any;
	viewport: typeof initialState.UI.dimensions.viewport;
}

const FeedCard = connector(({ model, viewport }: FeedCardProps) => {
	const router = useRouter();
	const [extraStyles, setExtraStyles] = useState({
		container: { gridTemplateColumns: "40% 60%" },
	});

	useEffect(() => {
		let w = viewport.width;
		if (w <= CARD_BREAKPOINT) {
			setExtraStyles({
				container: {
					gridTemplateColumns: "1fr",
				},
			});
		}
		if (w > CARD_BREAKPOINT) {
			setExtraStyles({
				container: {
					gridTemplateColumns: "40% 60%",
				},
			});
		}
	}, [viewport]);
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
					className="max-w-full min-h-[200px] max-h-fit sm:max-h-[400px] px-2 py-2 mx-2 my-3 rounded-md shadow-md hover:shadow-sm feed-card-container"
					style={{
						transition: "box-shadow 0.3s ease-in-out",
						border: "1px solid #cbd5e1",
						transform: "translateX(-150%)",
					}}
					onMouseEnter={preloadContent}
				>
					{model._model === "volunteer" && (
						<FeedCard_volunteer model={model} extraStyles={extraStyles} />
					)}
					{model._model === "patron" && (
						<FeedCard_patron model={model} extraStyles={extraStyles} />
					)}
					{model._model === "generalPost" && (
						<FeedCard_generalPost model={model} extraStyles={extraStyles} />
					)}
				</div>
			)}
		</Fragment>
	);
});

export default FeedCard;

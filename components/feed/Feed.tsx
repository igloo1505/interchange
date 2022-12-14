import React from "react";
import FeedFilter from "./FeedFilter";
interface FeedProps {}

const Feed = ({}: FeedProps) => {
	return (
		<div className="mx-3 w-full my-4">
			<FeedFilter />
		</div>
	);
};

export default Feed;

import React from "react";
import FeedFilter from "./FeedFilter";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import FeedCard from "./FeedCard";

const connector = connect((state: RootState, props) => ({
	feed: state.global.feed,
}));

interface FeedProps {
	feed: typeof initialState.global.feed;
}

const Feed = connector(({ feed }: FeedProps) => {
	return (
		<div className="mx-3 w-full my-4">
			<FeedFilter />
			<div>
				{feed.data &&
					feed.data.map((f, i) => {
						return <FeedCard model={f} key={`feed-card-${i}`} />;
					})}
			</div>
		</div>
	);
});

export default Feed;

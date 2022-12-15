import React, { useState, useEffect } from "react";
import FeedFilter from "./FeedFilter";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import FeedCard from "./FeedCard";
import Paginate from "./Paginate";

const connector = connect((state: RootState, props) => ({
	feed: state.global.feed,
}));

interface FeedProps {
	feed: typeof initialState.global.feed;
}

const Feed = connector(({ feed }: FeedProps) => {
	const [feedContent, setFeedContent] = useState(
		Array.isArray(feed.data) ? feed.data : []
	);
	useEffect(() => {
		setFeedContent(feed.data);
	}, [feed]);
	return (
		<div className="mx-3 w-full my-4">
			<FeedFilter />
			<div>
				{feedContent &&
					feedContent.map((f, i) => {
						return <FeedCard model={f} key={`feed-card-${i}`} />;
					})}
			</div>
			<Paginate />
		</div>
	);
});

export default Feed;

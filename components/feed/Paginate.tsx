import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import {
	filterFeed,
	populateGlobal,
	setFeedDataIndependently,
} from "../../state/actions";
import initialState from "../../state/initialState";
import { RootState } from "../../state/store";
import { populateEmptyFeed } from "../../utils/populateEmptyFeed";

const PER_PAGE = 10;

const connector = connect((state: RootState, props) => ({
	feed: state.global.feed,
}));
interface PaginateProps {
	feed: typeof initialState.global.feed;
}

const getButtons = (max: number, page: number, total: number) => {
	let arr: { n: number; active: boolean }[] = [];
	for (let i = 1; i < max + 1; i++) {
		arr.push({
			n: i,
			active: page === i,
		});
	}
	return arr;
};

interface buttonInterface {
	n: number;
	active: boolean;
}

const Paginate = connector(
	({ feed: { data, page, total, query } }: PaginateProps) => {
		const [buttons, setButtons] = useState<buttonInterface[]>([]);
		const dispatch = useAppDispatch();
		useEffect(() => {
			setButtons(getButtons(Math.ceil(total / PER_PAGE), page, total));
		}, [data, page, total]);

		const handleButtonClick = (n: number) => {
			if (query === "" || !query) {
				let feedData: { data: any[]; page: number }[] = populateEmptyFeed(
					null,
					true,
					n
				);
				console.log("feedData: ", feedData);
				///@ts-ignore
				setFeedDataIndependently(feedData);
			}
			if (query && query !== "") {
				filterFeed(query || "", n);
			}
			if (typeof window === "undefined") {
				return;
			}
			let target = document.getElementById("feed-filter-input-container");
			if (!target) return;
			target.scrollIntoView();
			// 	window.scrollTo({
			// 		behavior: "smooth",
			// 		top: target?.getBoundingClientRect().top + window.innerHeight,
			// 	});
		};

		return (
			<div className="flex flex-row gap-1 w-full justify-end px-5">
				{buttons.map((n) => {
					return (
						<div
							className={clsx(
								"px-2 py-1 rounded bg-primary-700 text-white cursor-pointer",
								n.active && "bg-primary-300 text-primary-900 cursor-default"
							)}
							onClick={() => handleButtonClick(n.n)}
						>
							{n.n}
						</div>
					);
				})}
			</div>
		);
	}
);

export default Paginate;

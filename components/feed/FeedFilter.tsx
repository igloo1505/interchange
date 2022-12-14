import React from "react";
import { filterFeed } from "../../state/actions";
interface FeedFilterProps {}

const FeedFilter = ({}: FeedFilterProps) => {
	const handleFilterChange = async (e) => {
		await filterFeed(e.target.value);
	};

	return (
		<div className="w-full flex justify-center items-center">
			<input
				type="text"
				className="w-full form-input"
				placeholder="Filter..."
				style={{
					maxWidth: "min(85%, 300px)",
					borderRadius: "8px",
				}}
				onChange={handleFilterChange}
			/>
		</div>
	);
};

export default FeedFilter;

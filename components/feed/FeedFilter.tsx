import React, { useState, useEffect } from "react";
import { filterFeed, setFeedDataIndependently } from "../../state/actions";
interface FeedFilterProps {}

const FeedFilter = ({}: FeedFilterProps) => {
	const [formData, setFormData] = useState<string>("");
	const handleFilterChange = async () => {
		if (formData === "") {
			return setFeedDataIndependently();
		}
		await filterFeed(formData);
	};
	useEffect(() => {
		handleFilterChange();
	}, [formData]);

	return (
		<div
			className="w-full flex justify-center items-center"
			id="feed-filter-input-container"
		>
			<input
				type="text"
				className="w-full form-input"
				placeholder="Filter..."
				value={formData}
				style={{
					maxWidth: "min(85%, 300px)",
					borderRadius: "8px",
				}}
				onChange={(e) => setFormData(e.target.value)}
			/>
		</div>
	);
};

export default FeedFilter;

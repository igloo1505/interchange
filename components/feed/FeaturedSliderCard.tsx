import React, { useState, useEffect } from "react";
import { FeaturedInterface } from "../../models/Featured";

interface FeaturedSliderCardProps {
	featured: FeaturedInterface;
	index: number;
}

const FeaturedSliderCard = ({ featured, index }: FeaturedSliderCardProps) => {
	console.log("featured: ", featured.title);
	return (
		<div className="bg-primary-800 text-white flex justify-center items-center h-full w-full">
			{index}
		</div>
	);
};

export default FeaturedSliderCard;

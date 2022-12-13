import React from "react";
import { FeaturedInterface } from "../../models/Featured";

interface FeaturedSlider_cardProps {
	featured: FeaturedInterface;
}

const FeaturedSlider_card = ({ featured }: FeaturedSlider_cardProps) => {
	return <div className="w-full h-full">{featured.title}</div>;
};

export default FeaturedSlider_card;

import React, { useEffect, useState } from "react";
import FeaturedSlider from "../feed/FeaturedSlider";

const Home = () => {
	return (
		<div className="flex flex-col items-center justify-start w-full min-h-full">
			<FeaturedSlider />
		</div>
	);
};

export default Home;

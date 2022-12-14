import React from "react";

interface LocationProps {
	location: string;
}

const Location = ({ location }: LocationProps) => {
	return <div className="text-primary-700 text-lg my-3">{location}</div>;
};

export default Location;

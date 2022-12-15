import React from "react";
import Link from "next/link";
import { ObjectId } from "mongoose";
interface SeeMoreProps {
	id: string | ObjectId;
	resource: "volunteerSpotlight" | "post" | "patrons";
}

const SeeMore = ({ id, resource }: SeeMoreProps) => {
	return (
		<div className="flex flex-row justify-end items-end px-3">
			<Link href={`/${resource}/${id}`} className="w-fit h-fit">
				<div className="bg-primary-700 text-white px-3 py-2 hover:bg-primary-600 transition-colors duration-300">
					See More
				</div>
			</Link>
		</div>
	);
};

export default SeeMore;

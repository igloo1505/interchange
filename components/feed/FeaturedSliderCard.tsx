import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FeaturedInterface } from "../../models/Featured";
import { sliceText, filterTags } from "../../utils/sliceText";
import Image from "next/image";
import Link from "next/link";
interface FeaturedSliderCardProps {
	featured: FeaturedInterface;
	index: number;
}

const FeaturedSliderCard = ({ featured, index }: FeaturedSliderCardProps) => {
	const router = useRouter();

	let imageIndex =
		featured.primaryImageIndex && featured.primaryImageIndex < featured.images
			? featured.primaryImageIndex
			: 0;
	return (
		<div className="bg-primary-800 text-white grid h-full w-full featuredCard relative z-[100]">
			<div
				className="px-5 py-4 text-2xl flex flex-row justify-start items-center font-bold z-[100]"
				style={{
					gridArea: "title",
				}}
			>
				{featured.title}
			</div>
			<div
				className="h-full w-full px-8 py-3 flex flex-col justify-end items-center z-[100]"
				style={{
					gridArea: "body",
				}}
			>
				{sliceText(filterTags({ text: featured.description }), 200)}
			</div>
			<div
				className="h-[60px] w-full px-4 py-4 flex flex-row justify-end items-center z-[100]"
				style={{
					gridArea: "buttons",
				}}
			>
				<Link href={`/featured/${featured._id || featured.id}`}>
					<div className="bg-primary-600 text-white rounded px-3 py-2 w-fit h-fit my-3 cursor-pointer shadow-sm z-[100]">
						See More
					</div>
				</Link>
			</div>
			<div className="absolute h-full w-full bg-black z-[99] transition-all duration-500 slider-backdrop" />
			<Image
				src={featured.images[imageIndex]?.publicUrl}
				alt="Event Image"
				fill
				className="object-cover absolute"
				style={{
					zIndex: 1,
				}}
			/>
		</div>
	);
};

export default FeaturedSliderCard;

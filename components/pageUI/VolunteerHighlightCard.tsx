import React, { useState, useEffect } from "react";
import { VolunteerInterface } from "../../models/Volunteer";
import Image from "next/image";
import gsap from "gsap";
import clsx from "clsx";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { useDrag } from "@use-gesture/react";
import SwipeIcon from "@mui/icons-material/Swipe";

interface VolunteerHighlightCardProps {
	volunteer: VolunteerInterface;
	setActiveIndex: (number) => void;
	activeIndex: number;
	index: number;
	nImages: number;
	isInitialIndex: boolean;
	setIsInitialIndex: (boolean) => void;
}

const VolunteerHighlightCard = ({
	volunteer,
	activeIndex,
	setActiveIndex,
	index,
	nImages,
	isInitialIndex,
	setIsInitialIndex,
}: VolunteerHighlightCardProps) => {
	let _id = `volunteer-card-${volunteer._id || volunteer.id}`;
	const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex || 0);

	let tl = gsap.timeline();
	useEffect(() => {
		let fromRight = activeIndex > lastActiveIndex;
		if (activeIndex === lastActiveIndex || tl.isActive()) return;
		if (lastActiveIndex === index) {
			// Dispose to left
			tl.to(`#${_id}`, {
				x: fromRight ? "-100%" : "100%",
				opacity: 0,
				duration: 1,
				ease: "elastic.out(1, 0.7)",
			});
		}
		if (activeIndex === index) {
			// Enter from right
			tl.fromTo(
				`#${_id}`,
				{
					x: !fromRight ? "-100%" : "100%",
					opacity: 0,
					delay: 0.3,
					duration: 1,
					ease: "elastic.out(1, 0.7)",
				},
				{
					x: 0,
					opacity: 1,
					ease: "elastic.out(1, 0.7)",
				}
			);
		}
		setLastActiveIndex(activeIndex);
	}, [activeIndex, index]);

	const bind = useDrag(({ swipe: [swipeX] }) => {
		let newIndex = activeIndex + swipeX;
		if (newIndex < 0) newIndex = nImages - 1;
		if (newIndex > nImages - 1) newIndex = 0;
		setActiveIndex(newIndex);
		setIsInitialIndex(false);
	});

	return (
		<div
			{...bind()}
			id={_id}
			className="h-fit w-auto absolute grid gap-1 touch-none"
			style={{
				opacity: activeIndex === index ? 1 : 0,
				gridTemplateRows: "auto 1fr",
				zIndex: activeIndex === index ? 1000 : 1,
			}}
		>
			<Link href={`/volunteerSpotlight/${volunteer._id}`} className="w-fit">
				<div className="font-bold text-primary-800 w-fit md:text-xl select-none">
					{volunteer.name.first}
				</div>
			</Link>
			{volunteer.images && (
				<div
					className={clsx(
						"w-auto h-full overflow-hidden flex justify-center items-center rounded-sm",
						activeIndex === index &&
							"shadow-md hover:shadow-sm transition-shadow duration-300"
					)}
				>
					<Link href={`/volunteerSpotlight/${volunteer._id}`} className="w-fit">
						<Image
							src={volunteer.images[volunteer.primaryImageIndex || 0].publicUrl}
							height={400}
							width={400}
							draggable={false}
							alt="Volunteer Spotlight Image"
							className="max-h-[280px] h-[280px] w-auto max-w-full"
							style={{ userSelect: "none" }}
						/>
					</Link>
				</div>
			)}

			{isInitialIndex && isMobile && (
				<div
					className="bg-primary-700 opacity-90 grid place-items-center w-full h-full absolute"
					onClick={() => setIsInitialIndex(false)}
					
				>
					<SwipeIcon
						className="text-white fill-white"
						sx={{
							width: "3rem",
							height: "3rem",
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default VolunteerHighlightCard;

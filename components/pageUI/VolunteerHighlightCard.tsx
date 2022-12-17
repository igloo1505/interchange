import React, { useState, useEffect } from "react";
import { VolunteerInterface } from "../../models/Volunteer";
import Image from "next/image";
import gsap from "gsap";
import clsx from "clsx";
import Link from "next/link";

interface VolunteerHighlightCardProps {
	volunteer: VolunteerInterface;
	setActiveIndex: (number) => void;
	activeIndex: number;
	index: number;
}

const VolunteerHighlightCard = ({
	volunteer,
	activeIndex,
	setActiveIndex,
	index,
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
	return (
		<div
			id={_id}
			className="h-fit w-auto absolute grid gap-1"
			style={{
				opacity: activeIndex === index ? 1 : 0,
				// gridTemplateRows: "2rem 1fr",
				gridTemplateRows: "auto 1fr",
				zIndex: activeIndex === index ? 1000 : 1,
			}}
		>
			<Link href={`/volunteerSpotlight/${volunteer._id}`} className="w-fit">
				<div className="font-bold text-primary-800 w-fit md:text-xl">
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
							alt="Volunteer Spotlight Image"
							className="max-h-[280px] h-[280px] w-auto max-w-full"
						/>
					</Link>
				</div>
			)}
		</div>
	);
};

export default VolunteerHighlightCard;

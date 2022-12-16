import React, { useState, useEffect } from "react";
import { section, subSection } from "./docsData";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import clsx from "clsx";

interface DocsSubSectionAccordianProps {
	subSection: subSection;
}

const DocsSubSectionAccordian = ({
	subSection,
}: DocsSubSectionAccordianProps) => {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		let em = document.getElementById(
			`subsection-accordion-container-${subSection.id}`
		);
		if (!em) return;
		if (isOpen) {
			em.style.height = "fit-content";
		}
		if (!isOpen) {
			setTimeout(() => {
				if (!em || isOpen) return;
				em.style.height = "2rem";
			}, 350);
		}
	}, [isOpen]);
	return (
		<div
			className="h-fit max-h-fit"
			style={{
				transition: "all 0.3s ease-in-out",
				height: "2rem",
			}}
			id={`subsection-accordion-container-${subSection.id}`}
		>
			<div
				className="cursor-pointer flex flex-row gap-1 bg-white z-10"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="text-primary-600 text-lg ">{subSection.title}</div>
				<ArrowDropDownIcon
					className="fill-primary-600 text-primary-600"
					style={{
						transition: "all 0.3s ease-in-out",
						transform: `rotateZ(${isOpen ? "180" : "0"}deg)`,
					}}
				/>
			</div>
			<div
				className={clsx(
					"overflow-hidden z-[10]",
					!isOpen && "docs-accordion-hide"
				)}
				style={{
					transformOrigin: "top",
					transition: "all 0.35s ease-in-out",
					transform: `scaleY(${isOpen ? 1 : 0})`,
					opacity: isOpen ? 1 : 0,
					// transform: `translateY(${isOpen ? 0 : "-100%"})`,
				}}
			>
				{subSection.content}
			</div>
		</div>
	);
};

export default DocsSubSectionAccordian;

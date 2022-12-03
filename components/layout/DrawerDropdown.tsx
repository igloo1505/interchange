import React, { useState, useEffect } from "react";
import { NavLink } from "./Navbar";
import { BiDownArrow } from "react-icons/bi";
import gsap from "gsap";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleDrawer } from "../../state/actions";

interface DrawerDropdownProps {
	items: NavLink[];
	title: string;
}

const DrawerDropdown = ({ items, title }: DrawerDropdownProps) => {
	let itemClassName = `${title.replace(" ", "")}-menu-item`;
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(-1);
	const dispatch = useAppDispatch();
	useEffect(() => {
		animateMenu(isOpen, itemClassName, items.length);
	}, [isOpen]);
	return (
		<div className="w-full">
			<div
				className="relative flex flex-row items-center justify-center w-full gap-2 font-bold text-white cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="ml-[1.4rem] text-lg">{title}</div>
				<BiDownArrow
					className="translate-y-[1px] fill-white"
					id={`${itemClassName}-downArrow-icon`}
				/>
			</div>
			<div
				className={"flex flex-col items-center justify-center mt-2"}
				id={`${itemClassName}-dropdown-container`}
			>
				{items.map((l, i) => {
					return (
						<a
							href={l.href}
							key={`${title}-${i}`}
							className={`scale-y-0 text-white mx-3 ${
								i === items.length - 1 ? "mb-4" : ""
							} ${itemClassName}`}
							onMouseEnter={() => setHoveredIndex(i)}
							onMouseLeave={() => setHoveredIndex(-1)}
							onClick={() => {
								dispatch(toggleDrawer());
								setTimeout(() => {
									dispatch(l.onClick());
								}, 500);
							}}
						>
							{l.text}
							<div
								className="bg-sky-300 h-[2px] w-full transition-all duration-300"
								style={{
									transform: `scaleX(${hoveredIndex === i ? 1 : 0})`,
								}}
							/>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default DrawerDropdown;

const animateMenu = (isOpen: boolean, itemClass: string, itemCount: number) => {
	let tl = gsap.timeline();
	gsap.to(`#${itemClass}-downArrow-icon`, {
		rotateZ: isOpen ? "180deg" : 0,
		duration: 0.3,
		ease: "Power3.out",
	});
	if (isOpen) {
		tl.to(`#${itemClass}-dropdown-container`, {
			height: isOpen ? `${itemCount * 24 + 16}px` : "0",
			duration: 0.5,
			// immediateRender: true,
		});
	}
	tl.to(`.${itemClass}`, {
		scaleY: isOpen ? 1 : 0,
		duration: 0.2,
		// stagger: isOpen ? 0.1 : 0,
		stagger: {
			amount: 0.3,
			from: isOpen ? "start" : "end",
		},
		ease: "Power3.out",
	});
	if (!isOpen) {
		tl.to(`#${itemClass}-dropdown-container`, {
			height: isOpen ? `${itemCount * 24}px` : "0",
			duration: 0.5,
			// immediateRender: true,
		});
	}
};

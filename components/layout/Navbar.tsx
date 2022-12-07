import React, { useEffect } from "react";
import gsap from "gsap";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import Link from "next/link";
import { Url } from "url";
interface NavbarProps {}
export interface NavLink {
	text: string;
	href: Url;
	onClick?: () => void | any;
}

export const links: NavLink[] = [
	{
		text: "Home",
		href: "/" as unknown as Url,
		// onClick: null,
	},
	{
		text: "About",
		href: "/About" as unknown as Url,
		// onClick: null,
	},
	{
		text: "Contact",
		href: "/Contact" as unknown as Url,
		// onClick: null,
	},
	{
		text: "Hours & Location",
		href: "/HoursAndLocation" as unknown as Url,
		// onClick: null,
	},
	{
		text: "Volunteer",
		href: "/Volunteer" as unknown as Url,
		// onClick: null,
	},
	{
		text: "Resources",
		href: "/Resources" as unknown as Url,
		// onClick: null,
	},
	{
		text: "Donate",
		href: "/Donate" as unknown as Url,
		// onClick: null,
	},
];

const Navbar = ({}: NavbarProps) => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		animateEntrance();
	}, []);

	return (
		<div
			className="flex-row items-center justify-center hidden w-full gap-2 py-3 md:flex"
			id="navbar-outer-container"
		>
			{links.map((l, i, a) => {
				return (
					<div
						className="flex flex-col items-center justify-center navbar-item"
						key={`navbar-link-${i}`}
						onMouseEnter={() => animateHover(i)}
						onMouseLeave={() => cancelAnimation(i)}
					>
						<Link
							href={l.href}
							onClick={l.onClick ? l.onClick() : null}
							className="px-2 text-sm uppercase transition-all duration-200 text-primary-800 hover:text-secondary"
							style={{
								...(i < a.length - 1 && { borderRight: "1px solid #bae6fd" }),
							}}
							shallow={true}
						>
							{l.text}
						</Link>
						<div
							className="h-[4px] bg-sky-700 w-full navbar-underline"
							id={`navbar-underline-${i}`}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Navbar;

const animateHover = (index: number) => {
	let tl = gsap.timeline();
	tl.to(`#navbar-underline-${index}`, {
		scaleX: 0,
		duration: 0.2,
		ease: "Power3.out",
	});
	tl.to(`#navbar-underline-${index}`, {
		backgroundColor: "#ea580c",
		duration: 0,
		immediateRender: true,
	});

	tl.to(`#navbar-underline-${index}`, {
		scaleX: 1,
		duration: 0.2,
		ease: "Power3.out",
	});
};

const cancelAnimation = (index: number) => {
	let tl = gsap.timeline();
	tl.to(`#navbar-underline-${index}`, {
		scaleX: 1,
		backgroundColor: "#0369a1",
		duration: 0.2,
		ease: "Power3.out",
	});
};

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.to(
		".navbar-underline",
		{
			scaleX: 1,
			duration: 0.3,
			stagger: 0.1,
			ease: "elastic.out(1, 0.6)",
		},
		"+=0.4"
	);
};

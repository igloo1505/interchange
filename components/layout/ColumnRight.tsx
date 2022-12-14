import React, { Fragment, useEffect, useState } from "react";
import initialState from "../../state/initialState";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import info from "../../utils/infoDetails";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleColumnRight } from "../../state/actions";
import { useRouter } from "next/router";
const Map = dynamic(() => import("../general/Map"), { ssr: false });

interface ColumnRightProps {
	dimensions: typeof initialState.UI.dimensions;
	animationDelay?: number | null | undefined;
	isOpen: boolean;
}

const connector = connect((state: RootState, props) => ({
	isOpen: state.UI.drawer.columnRightOpen,
	dimensions: state.UI.dimensions,
	props: props,
}));

const ColumnRight = connector(
	({ dimensions, animationDelay, isOpen }: ColumnRightProps) => {
		const dispatch = useAppDispatch();
		const [listenerKey, setListenerKey] = useState(false);
		const router = useRouter();
		const toggleOpen = (val?: boolean) => {
			dispatch(toggleColumnRight(val));
		};
		const [showBottomContent, setShowBottomContent] = useState(false);
		const [width, setWidth] = useState({
			closed: "200px",
			open: "80vw",
		});
		const [scrollStyles, setScrollStyles] = useState({
			height: `${dimensions.viewport.height - dimensions.navbar.height - 16}px`,
			top: `${dimensions.navbar.height}px`,
		});
		useEffect(() => {
			let _delay = animationDelay || 0;
			if (router.asPath !== "/HoursAndLocation") {
				setTimeout(animateEntrance, _delay);
			}
			if (router.asPath === "/HoursAndLocation") {
				hideColumn();
			}
		}, [router.asPath]);
		const handleWidth = () => {
			if (typeof window === "undefined") {
				return;
			}
			let w = window.innerWidth;
			if (!w) return;
			setWidth({
				closed: "200px",
				open: `${w * 0.8}px`,
			});
		};
		const handleScroll = () => {
			if (typeof window === "undefined") {
				return;
			}
			let em = document.getElementById("navbar-outer-container");
			if (!em) return;
			let em2 = document.getElementById("column-right-container");
			if (em2) {
				em2.style.transition = "unset";
			}
			let v = em.getBoundingClientRect().height - scrollY;
			let _styles = {
				top: v > 0 ? `${v}px` : `${0}px`,
				height: `${window.innerHeight - v}px`,
			};
			if (em2) {
				em2.style.transition = "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
			}
			setScrollStyles(_styles);
			if (!listenerKey) {
				setListenerKey(true);
			}
		};
		useEffect(() => {
			if (typeof window === "undefined") {
				return;
			}
			handleWidth();
			handleScroll();
			// window.addEventListener("resize", handleWidth);
			// if (!listenerKey) {
			// }
			if (!listenerKey) {
				window.addEventListener("scroll", handleScroll);
			}
		}, [dimensions]);

		useEffect(() => {
			if (!isOpen) {
				setTimeout(() => setShowBottomContent(true), 750);
			}
			if (isOpen) {
				setShowBottomContent(false);
			}
		}, [isOpen]);
		return (
			<Fragment>
				<div
					className="hidden md:flex flex-col items-center justify-start bg-primary-900 z-[500] transition-all duration-700 fixed"
					id="column-right-container"
					style={{
						transform: "translateX(100%)",
						right: 0,
						// top: `${dimensions.navbar.height}x`,
						// height: isOpen
						// 	? `calc(100vh - ${dimensions.navbar.height + 32}px)`
						// 	: `calc(100vh - ${dimensions.navbar.height}px)`,
						width: isOpen ? width.open : width.closed,
						...scrollStyles,
					}}
				>
					<Map />
					{showBottomContent && (
						<Fragment>
							<div className="w-full text-center text-white">
								{info.address.main.pantry}
							</div>
							<div className="w-full text-center text-white">{`${info.city}, ${info.state}`}</div>
							<div className="w-full text-center text-white">{info.zip}</div>
						</Fragment>
					)}
				</div>
				<div
					className="fixed top-0 left-0 w-screen h-screen z-[499] origin-right bg-slate-700"
					style={{
						transform: isOpen ? "scale(1, 1)" : "scale(0,0)",
						opacity: isOpen ? 0.2 : 0,
						transition: "opacity 0.4s ease-in-out",
					}}
					onClick={() => toggleOpen(false)}
				/>
			</Fragment>
		);
	}
);

export default ColumnRight;

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.to("#column-right-container", {
		x: 0,
		duration: 0.5,
		ease: "Power3.out",
	});
};

const hideColumn = () => {
	if (typeof window === "undefined") {
		return;
	}
	let em = document.getElementById("column-right-container");
	if (!em) return;
	em.style.transform = "translateX(100%)";
};

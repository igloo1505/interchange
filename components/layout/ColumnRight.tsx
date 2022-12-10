import React, { Fragment, useEffect, useState } from "react";
import initialState from "../../state/initialState";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import info from "../../utils/infoDetails";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleColumnRight } from "../../state/actions";
// import Map from "../general/Map";
const Map = dynamic(() => import("../general/Map"), { ssr: false });

interface ColumnRightProps {
	dimensions: typeof initialState.UI.dimensions;
	animationDelay?: number | null | undefined;
	isOpen: boolean;
}

const connector = connect((state: RootState, props) => ({
	isOpen: state.UI.drawer.columnRightOpen,
	dimensions: state.UI.dimensions,
}));

const ColumnRight = connector(
	({ dimensions, animationDelay, isOpen }: ColumnRightProps) => {
		const dispatch = useAppDispatch();
		const toggleOpen = (val?: boolean) => {
			dispatch(toggleColumnRight(val));
		};
		const [showBottomContent, setShowBottomContent] = useState(false);
		const [width, setWidth] = useState({
			closed: "200px",
			open: "80vw",
		});
		useEffect(() => {
			let _delay = animationDelay || 0;
			setTimeout(animateEntrance, _delay);
		}, []);
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
		useEffect(() => {
			if (typeof window === "undefined") {
				return;
			}
			handleWidth();
			window.addEventListener("resize", handleWidth);
		}, []);

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
					className="fixed flex flex-col items-center justify-start w-full bg-primary-900 z-[500] transition-all duration-700"
					id="column-right-container"
					style={{
						transform: "translateX(100%)",
						right: 0,
						height: isOpen
							? `calc(100vh - ${dimensions.navbar.height + 32}px)`
							: `calc(100vh - ${dimensions.navbar.height}px)`,
						width: isOpen ? width.open : width.closed,
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
	console.log("animateEntrance");
	let tl = gsap.timeline();
	tl.to("#column-right-container", {
		x: 0,
		duration: 0.5,
		ease: "Power3.out",
	});
};

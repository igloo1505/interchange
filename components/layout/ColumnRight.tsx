import React, { Fragment, useEffect, useState } from "react";
import initialState from "../../state/initialState";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import info from "../../utils/infoDetails";
// import Map from "../general/Map";
const Map = dynamic(() => import("../general/Map"), { ssr: false });
interface ColumnRightProps {
	dimensions: typeof initialState.UI.dimensions;
	animationDelay?: number | null | undefined;
	isOpen: boolean;
}

const connector = connect((state: RootState, props) => ({
	isOpen: state.UI.drawer.columnRightOpen,
}));

const ColumnRight = connector(
	({ dimensions, animationDelay, isOpen }: ColumnRightProps) => {
		const [showBottomContent, setShowBottomContent] = useState(false);
		useEffect(() => {
			let _delay = animationDelay || 0;
			setTimeout(animateEntrance, _delay);
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
			<div
				className="flex flex-col items-center justify-start w-full bg-primary-900"
				id="column-right-container"
				style={{
					// width: "min(200px, 20vw)",
					transform: "translateX(100%)",
					minHeight:
						!Number.isNaN(parseInt(`${dimensions.navbar.height}`)) &&
						dimensions.viewport.height
							? `max(${
									dimensions.viewport.height - dimensions.navbar.height
							  }px, 100%)`
							: "100%",
					height: isOpen
						? `calc(100vh - ${dimensions.navbar.height + 16}px)`
						: `calc(100vh - ${dimensions.navbar.height}px)`,
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

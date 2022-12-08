import React, { useEffect } from "react";
import initialState from "../../state/initialState";
import gsap from "gsap";
import dynamic from "next/dynamic";
// import Map from "../general/Map";
const Map = dynamic(() => import("../general/Map"), { ssr: false });
interface ColumnRightProps {
	dimensions: typeof initialState.UI.dimensions;
	animationDelay?: number | null | undefined;
}

const ColumnRight = ({ dimensions, animationDelay }: ColumnRightProps) => {
	useEffect(() => {
		let _delay = animationDelay || 0;
		setTimeout(animateEntrance, _delay);
	}, []);
	return (
		<div
			className="flex flex-col items-center justify-start h-full min-h-screen bg-primary-900"
			id="column-right-container"
			style={{
				// width: "min(200px, 20vw)",
				transform: "translateX(100%)",
				minHeight:
					!Number.isNaN(parseInt(`${dimensions.navbar.height}`)) &&
					dimensions.viewport.height
						? `${dimensions.viewport.height - dimensions.navbar.height}px`
						: "100%",
			}}
		>
			<Map />
		</div>
	);
};

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

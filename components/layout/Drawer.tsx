import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleDrawer } from "../../state/actions";
import gsap from "gsap";
import { links } from "./Navbar";
import infoDetails from "../../utils/infoDetails";
import Link from "next/link";

interface DrawerProps {
	drawer: RootState["UI"]["drawer"];
}

const Drawer = ({ drawer }: DrawerProps) => {
	const dispatch = useAppDispatch();
	const [hoveredIndex, setHoveredIndex] = useState(-1);
	useEffect(() => {
		// debugger;
		// setShow(drawer.isOpen);
		animateBackdropEntrance(drawer.isOpen);
	}, [drawer]);
	const handleBackdropClick = () => {
		dispatch(toggleDrawer(false));
	};

	return (
		<Fragment>
			<div
				className={clsx(
					"fixed top-0 left-0 h-screen bg-sky-700 w-fit min-w-[150px] z-[1000] flex flex-col justify-between",
					drawer.isOpen ? "transformDrawer_show" : "transformDrawer_hide"
				)}
				id="drawer-outer-container"
			>
				<div
					className={clsx(
						"flex flex-col justify-start items-center  pt-5 gap-1"
					)}
				>
					{links.map((l, i) => {
						return (
							<Link
								href={l.href}
								key={`drawer-item-${l}-${i}`}
								className={`text-white mx-3 ${
									i === links.length - 1 ? "mb-4" : ""
								}`}
								onMouseEnter={() => setHoveredIndex(i)}
								onMouseLeave={() => setHoveredIndex(-1)}
								onClick={() => {
									dispatch(toggleDrawer());
									setTimeout(() => {
										if (l.onClick) {
											dispatch(l.onClick());
										}
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
							</Link>
						);
					})}
				</div>
				<div className="w-full px-2 py-4 text-center text-white h-fit">
					<div>
						<a href={`tel:${infoDetails.phone.value}`}>
							{infoDetails.phone.display}
						</a>
					</div>
					<hr className="my-2" />
					<a href={infoDetails.mapsHref} target="_blank">
						<div>{infoDetails.address.main.pantry}</div>
						<div>{`${infoDetails.city}, ${infoDetails.state}`}</div>
						<div>{infoDetails.zip}</div>
					</a>
				</div>
			</div>
			<div
				className={clsx(
					"w-screen fixed top-0 left-0 h-screen z-[950] bg-black bg-opacity-30"
				)}
				id="drawer-backdrop"
				onClick={handleBackdropClick}
			/>
		</Fragment>
	);
};

const mapStateToProps = (state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	props: props,
});

export default connect(mapStateToProps)(Drawer);

const animateBackdropEntrance = (isOpen: boolean) => {
	let tl = gsap.timeline();
	if (isOpen) {
		tl.to(`#drawer-backdrop`, {
			scale: isOpen ? 1 : 0,
			duration: 0,
			immediateRender: true,
		});
	}
	tl.to(`#drawer-backdrop`, {
		opacity: isOpen ? 1 : 0,
		duration: 0.5,
		ease: "Power3.out",
	});
	if (!isOpen) {
		tl.to(
			`#drawer-backdrop`,
			{
				scale: isOpen ? 1 : 0,
				duration: 0,
				immediateRender: true,
			},
			"+=0.5"
		);
	}
};

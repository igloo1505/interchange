import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleDrawer } from "../../state/actions";
import gsap from "gsap";
import { links } from "./Navbar";
import DrawerDropdown from "./DrawerDropdown";

interface DrawerProps {
	drawer: RootState["UI"]["drawer"];
}

const Drawer = ({ drawer: { isOpen } }: DrawerProps) => {
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	const [viewport, setViewport] = useState(9999);
	useEffect(() => {
		setShow(isOpen);
		animateBackdropEntrance(isOpen);
	}, [isOpen]);
	const handleBackdropClick = () => {
		dispatch(toggleDrawer(false));
	};
	const handleViewport = () => {
		if (typeof window === "undefined") {
			return;
		}
		setViewport(window.innerWidth);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		handleViewport();
		window.addEventListener("resize", handleViewport);
	}, []);

	return (
		<Fragment>
			<div
				className={clsx(
					"fixed top-0 left-0 h-screen bg-sky-700 w-fit min-w-[150px] flex flex-col justify-start items-center z-[1000] pt-5",
					show ? "transformDrawer_show" : "transformDrawer_hide"
				)}
				id="drawer-outer-container"
			>
				<DrawerDropdown items={links} title="About Us" />
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

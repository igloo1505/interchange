import React from "react";
import { connect } from "react-redux";
import initialState from "../../state/initialState";
import { RootState } from "../../state/store";
import { HiBars3 } from "react-icons/hi2";
import { toggleDrawer } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import Image from "next/image";
import IFPLogo from "../../public/assets/IFP-logo.png";
import Link from "next/link";

const connector = connect((state: RootState, props: any) => ({
	dimensions: state.UI.dimensions,
	props: props,
}));
interface Navbar_mobileProps {
	dimensions: typeof initialState.UI.dimensions;
	props: any;
}

const Navbar_mobile = connector(({ dimensions, props }: Navbar_mobileProps) => {
	const dispatch = useAppDispatch();
	const handleDrawerToggle = () => {
		dispatch(toggleDrawer());
	};
	return (
		<div
			className="grid w-full grid-cols-3 gap-2 py-2 mx-4 md:hidden place-items-center"
			id="navbar-outer-container"
		>
			<div className="flex items-center justify-center h-full place-self-start">
				<HiBars3
					style={{
						width: "2rem",
						height: "2rem",
					}}
					className="cursor-pointer"
					onClick={handleDrawerToggle}
				/>
			</div>
			<Link href="/">
				<Image src={IFPLogo} alt="Interchange Food Pantry Logo" height={80} />
			</Link>
		</div>
	);
});

export default Navbar_mobile;

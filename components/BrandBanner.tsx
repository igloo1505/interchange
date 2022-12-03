import React, { MouseEventHandler } from "react";
// import { toggleDrawer, showToast } from "../../state/actions";
import { useAppDispatch } from "../hooks/ReduxHooks";
import bannerLogoLeft from "../public/assets/bannerLogo-left.png";
import Image from "next/image";
import flagBackground from "../public/assets/flagBackground.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { toggleDrawer } from "../state/actions";

interface BrandBannerProps {}

const BrandBanner = ({}: BrandBannerProps) => {
	const dispatch = useAppDispatch();
	const handleDrawerToggle = () => {
		dispatch(toggleDrawer());
	};
	return (
		<div
			className="w-screen min-h-[64px] max-h-[90px] relative px-1 grid md:flex md:flex-row md:justify-between md:items-center overflow-hidden"
			id="BrandBanner-outer-container"
		>
			<div className="flex flex-col items-start justify-center h-auto w-fit md:hidden">
				<GiHamburgerMenu
					className="fill-sky-700 h-[1.4rem] w-[1.4rem] ml-5 cursor-pointer"
					onClick={handleDrawerToggle}
				/>
			</div>
			<Image
				src={flagBackground}
				alt="American flag"
				className="absolute flag-background"
			/>
			<Image
				src={bannerLogoLeft}
				alt="Brand logo"
				priority
				className="relative object-contain w-auto h-auto md:max-w-full md:w-auto md:min-h-full md:left-2 brandBannerLogo"
			/>
			<div className="flex-col items-end justify-center hidden gap-0 my-2 mr-8 md:flex">
				<a
					href="https://www.google.com/maps/place/ICM+Corporation/@42.9882149,-87.9162706,20.66z/data=!4m13!1m7!3m6!1s0x8805174255cb12fb:0x8afc1958dc7b209f!2s500+W+Oklahoma+Ave,+Milwaukee,+WI+53207!3b1!8m2!3d42.9882532!4d-87.9162903!3m4!1s0x8805174251122163:0xee6689ecf7115e65!8m2!3d42.988327!4d-87.9160308"
					target="_blank"
				>
					<div className="contact-line">500 W. Oklahoma Ave.</div>
					<div className="contact-line">Milwaukee, WI 53207</div>
				</a>
				<div className="contact-line">
					<a href="tel:18002294500"> Phone: 1-800-229-4500</a>
				</div>
				<div className="contact-line">Fax: 1-800-570-0007</div>
			</div>
		</div>
	);
};

export default BrandBanner;

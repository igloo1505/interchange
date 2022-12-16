import React, { useState, useEffect } from "react";
import PageTitle from "../layout/PageTitle";
import DonationCard from "../general/DonationCard";
// import SubTitle from "../pageUI/SubTitle";
import SubTitle from "../layout/SubTitle";
import ConditionalGoFundMeLink from "../general/ConditionalGoFundmeLink";
import gsap from "gsap";

interface DonateProps {}

const Donate = ({}: DonateProps) => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		let tl = gsap.timeline();
		tl.to("#donate-page-underline", {
			scaleX: 1,
			delay: 0.5,
			duration: 1,
			ease: "elastic.out(1, 0.6)",
		});
		tl.to(
			"#donate-page-title",
			{
				x: 0,
				duration: 1.3,
				ease: "elastic.out(1, 0.6)",
			},
			"-=0.6"
		);
		tl.to(
			"#donate-page-enter-2",
			{
				x: 0,
				duration: 1,
				ease: "elastic.out(1, 0.6)",
			},
			"-=0.8"
		);
		tl.to(
			"#donate-page-enter-3",
			{
				scale: 1,
				duration: 1,
				ease: "elastic.out(1, 0.6)",
			},
			"-=0.8"
		);
	}, []);
	return (
		<div className="mx-4 mt-3 mb-8">
			<PageTitle
				title="Donate"
				id_underline="donate-page-underline"
				id_text="donate-page-title"
				extraClasses_underline="scale-x-0"
				extraStyles={{
					transform: "translateX(-100vw)",
				}}
			/>
			<div
				className="mx-3 my-4 font-thin text-primary-600"
				style={{ transform: "translateX(-100vw)" }}
				id="donate-page-enter-2"
			>
				Please help Interchange Food Pantry accomplish our mission by donating
				online today.
			</div>
			<div
				className="flex items-center justify-center w-full my-8 scale-0"
				id="donate-page-enter-3"
			>
				<DonationCard />
			</div>
			<div>
				<SubTitle title="Other ways to give" />
				<div>
					<div>
						To make a donation by check or money order, please send your
						donation payable to{" "}
						<span className="text-primary-600 font-semibold">
							Interchange Food Pantry
						</span>{" "}
						to the following address:
					</div>
					<div className="text-primary-600 text-center w-full my-3">
						<span className="font-bold text-primary-700">Interchange</span>{" "}
						<br /> 1105 N Waverly Place,
						<br /> Milwaukee, WI 53202
					</div>{" "}
					<div>
						You can also donate online to our{" "}
						<ConditionalGoFundMeLink text="GoFundMe Healthy Food Fund" />.
					</div>
					<div>
						Are you interested in holding a food drive for the Interchange Food
						Panty? If so, please email us at{" "}
						<a
							href="mailto:ifpmilwaukee@gmail.com"
							className="text-primary-600"
						>
							ifpmilwaukee@gmail.com
						</a>{" "}
						or reach us by phone at{" "}
						<a href="tel:14145512184" className="text-primary-600">
							414.551.2184
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Donate;

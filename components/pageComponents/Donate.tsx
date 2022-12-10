import React, { useState, useEffect } from "react";
import PageTitle from "../layout/PageTitle";
import DonationCard from "../general/DonationCard";
interface DonateProps {}

const Donate = ({}: DonateProps) => {
	return (
		<div className="mx-4 my-3">
			<PageTitle
				title="Donate"
				id_underline="donate-page-underline"
				id_text="donate-page-title"
				// extraClasses_underline="scale-x-0"
				// extraStyles={{
				// 	transform: "translateX(-100vw)",
				// }}
			/>
			<div className="mx-3 my-4 font-thin text-primary-600">
				Please help Interchange Food Pantry accomplish our mission by donating
				online today.
			</div>
			<div className="flex items-center justify-center w-full my-8">
				<DonationCard />
			</div>
		</div>
	);
};

export default Donate;

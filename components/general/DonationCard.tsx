import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { BiDollar } from "react-icons/bi";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { numberOnlyKeyDown } from "../../utils/utilityFunctions";
import { notifyDemoDonation } from "../../state/demoActions";

const defaultOptions: { value: number; display: string }[] = [
	{
		value: 5,
		display: "$5.00",
	},
	{
		value: 25,
		display: "$25.00",
	},
	{
		value: 100,
		display: "$100.00",
	},
];

interface DonationCardProps {}
const activeButtonClasses = "donateButtonActive text-white";
const buttonClasses =
	"border border-primary-800 text-xl text-center px-8 py-5 relative cursor-pointer text-primary-800";
const DonationCard = ({}: DonationCardProps) => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({
		monthly: false,
		donationAmount: 0,
	});
	const handleSubmit = () => {
		if (formData.donationAmount === 0) return;
		dispatch(notifyDemoDonation(formData.donationAmount));
	};
	return (
		<div className="flex flex-col items-center justify-center w-fit">
			<div className="grid grid-cols-2">
				<div
					className={clsx(
						buttonClasses,
						!formData.monthly && activeButtonClasses,
						formData.monthly && "donate-button-inactive"
					)}
					onClick={() =>
						setFormData({
							...formData,
							monthly: false,
						})
					}
				>
					One-Time
					<div className="absolute top-0 left-0 w-full h-full donate-button-backdrop-right" />
				</div>
				<div
					className={clsx(
						buttonClasses,
						formData.monthly && activeButtonClasses,
						!formData.monthly && "donate-button-inactive"
					)}
					onClick={() =>
						setFormData({
							...formData,
							monthly: true,
						})
					}
				>
					Monthly
					<div className="absolute top-0 left-0 w-full h-full donate-button-backdrop-left" />
				</div>
			</div>
			<div>
				<div className="my-3 text-center">
					{formData.monthly
						? "Make a monthly donation"
						: "Make a one-time donation"}
				</div>
				<div
					style={{
						display: "grid",
						// gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
					}}
					className="grid-cols-3 gap-1"
				>
					{defaultOptions.map((d, i) => {
						return (
							<div
								key={`donation-default-${i}`}
								onClick={() =>
									setFormData({
										...formData,
										donationAmount: d.value,
									})
								}
								className={clsx(
									"px-3 py-3 text-center cursor-pointer",
									formData.donationAmount === d.value &&
										"donation-button-active"
								)}
								style={{
									border: "1px solid #0369a1",
								}}
							>
								{d.display}
							</div>
						);
					})}
				</div>
				<div className="flex flex-col items-center justify-center w-full">
					<div className="w-full py-4 text-center">
						Or enter a custom amount:
					</div>
					<div className="relative">
						<input
							className="pl-6 w-fit form-input"
							type="text"
							onKeyDown={numberOnlyKeyDown(["."])}
							onChange={(e) => {
								setFormData({
									...formData,
									donationAmount: parseFloat(e.target.value),
								});
							}}
						/>
						<BiDollar
							style={{
								position: "absolute",
								top: "50%",
								left: "5px",
								transform: "translateY(-50%)",
							}}
						/>
					</div>
					<div>Your contribution is appreciated.</div>
					<a>
						<div
							className={clsx(
								"px-5 py-4 my-5 text-white cursor-pointer bg-primary-500 hover:opacity-100 hover:shadow-md rounded-xl focus-visible:bg-primary-600",
								formData.donationAmount === 0
									? "donateButton-inactive"
									: "donateButton-active"
							)}
							style={{
								opacity: formData.donationAmount === 0 ? 0.4 : 1,
								transition:
									"box-shadow 0.4s ease-in-out, opacity 0.5s ease-in-out",
							}}
							onClick={handleSubmit}
						>
							Donate Now
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default DonationCard;

import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { signIn, getProviders } from "next-auth/react";
import IFPLogo from "../../public/assets/IFP-logo.png";
import Image from "next/image";
import Link from "next/link";

const SignIn: NextPage = () => {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
			<div className="flex flex-col h-full gap-4 justify-center items-center ">
				<Link href="/">
					<Image
						src={IFPLogo}
						alt="Interchange Food Pantry Logo"
						height={80}
						width={80}
						className="cursor-pointer mb-3"
					/>
				</Link>
				<div className="flex flex-col w-full gap-3 justify-center items-center">
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="w-full min-w-[300px] form-input"
					/>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="w-full min-w-[300px] form-input"
					/>
					<button
						onClick={() =>
							// signIn("credentials", {
							// 	callbackUrl: "/admin",
							// 	...formData,
							// })
							signIn("credentials", { ...formData, callbackUrl: "/admin" })
						}
						className="bg-primary-700 text-white text-xl md:text-xl px-4 py-3 rounded-lg shadow-lg hover:shadow-sm transition-all duration-300 w-full"
					>
						<span className="text-center">Sign In</span>
					</button>
				</div>
				<div className="flex flex-row justify-center items-center flex-nowrap gap-2">
					<Link href="/docs" className="w-fit">
						<div className="border border-solid border-primary-700 text-primary-700 text-xl md:text-xl px-4 py-3 rounded-lg shadow-lg hover:shadow-sm transition-all duration-300 cursor-pointer w-fit text-center">
							View App Docs
						</div>
					</Link>
					<a href="mailto:aiglinski414@gmail.com" className="w-fit">
						<div className="border border-solid border-primary-700 text-primary-700 text-xl md:text-xl px-4 py-3 rounded-lg shadow-lg hover:shadow-sm transition-all duration-300 cursor-pointer w-fit text-center">
							Email Developer
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

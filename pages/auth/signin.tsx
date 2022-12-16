import React from "react";
import { NextPage } from "next";
import { signIn, getProviders } from "next-auth/react";
import IFPLogo from "../../public/assets/IFP-logo.png";
import Image from "next/image";
import Link from "next/link";

const SignIn: NextPage = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
			<div
				className="grid gap-2 place-items-center"
				style={{
					gridTemplateRows: "auto 1fr 1fr 1fr",
				}}
			>
				<Link href="/">
					<Image
						src={IFPLogo}
						alt="Interchange Food Pantry Logo"
						height={80}
						width={80}
						className="cursor-pointer"
					/>
				</Link>
				<button
					onClick={() =>
						signIn("google", {
							callbackUrl: "/admin",
						})
					}
					className="bg-primary-700 text-white text-xl md:text-xl px-4 py-3 rounded-lg shadow-lg hover:shadow-sm transition-all duration-300"
				>
					<span className="text-center">
						Sign in with an authorized Google Account
					</span>
				</button>
				<Link href="/docs" className="w-full">
					<div className="border border-solid border-primary-700 text-primary-700 text-xl md:text-xl px-4 py-3 rounded-lg shadow-lg hover:shadow-sm transition-all duration-300 cursor-pointer w-full text-center">
						View App Docs
					</div>
				</Link>
				<a href="mailto:aiglinski414@gmail.com" className="w-full">
					<div className="border border-solid border-primary-700 text-primary-700 text-xl md:text-xl px-4 py-3 rounded-lg shadow-lg hover:shadow-sm transition-all duration-300 cursor-pointer w-full text-center">
						Email Developer
					</div>
				</a>
			</div>
		</div>
	);
};

export default SignIn;

export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: {
			providers,
		},
	};
}

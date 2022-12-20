import type { GetServerSidePropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import {
	SessionProvider,
	SessionContext,
	SessionProviderProps,
	useSession,
} from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../api/auth/[...nextauth]";
import AllowAccess from "../../models/AllowAccess";
import { connectServerSide } from "../../utils/connectMongo";
import "colors";

const App = dynamic(() => import("../../components/admin/Main"), {
	ssr: false,
});

const Admin: NextPage = ({ ...props }) => {
	console.log("props in admin...: ", props);

	return <App />;
};

export default Admin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	debugger;
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	if (!session) {
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}
	let sessionEmail = session?.email;
	if (!sessionEmail) {
		console.log("Email not in accessToken");
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}
	await connectServerSide(context.req, context.res);

	let allowable = await AllowAccess.findOne({ email: sessionEmail });

	if (allowable._id.toString() !== session?.id) {
		console.log("Invalid id found in token");
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}

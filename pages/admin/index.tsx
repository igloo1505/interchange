import type { GetServerSidePropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import { Fragment } from "react";
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
	const session: any = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	const token = await getToken({
		req: context.req,
	});
	console.log(`session: ${JSON.stringify(session, null, 2)}`.red);
	console.log("token: ", token);
	let hasEmail = session?.email;
	if (!hasEmail) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}
	let permissionGranted;
	const { req, res } = connectServerSide(context.req, context.res);
	// let _session = getSession(req);

	let allowable = await AllowAccess.find();
	let _allowable = [{ email: "interchangefp@gmail.com" }, ...allowable].map(
		(l) => l.email.toLowerCase()
	);
	console.log("allowable: ", _allowable);
	console.log(`session: ${session}`.bgBlue.white);
	if (!allowable || _allowable.indexOf(hasEmail.toLowerCase()) < 0) {
		return {
			redirect: {
				destination: "/",
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

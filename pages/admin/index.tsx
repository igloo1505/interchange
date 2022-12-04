import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Fragment } from "react";

const App = dynamic(() => import("../../components/admin/Main"), {
	ssr: false,
});

const Admin: NextPage = () => {
	return (
		<Fragment>
			<App />
		</Fragment>
	);
};

export default Admin;

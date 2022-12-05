import * as React from "react";
import {
	Admin,
	Resource,
	ListGuesser,
	SortButton,
	AddItemButton,
} from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
import dataProvider from "./dataHandlers/dataProvider";
import VolunteerList from "./dataHandlers/VolunteerList";
import VolunteerCreate from "./dataHandlers/VolunteerCreate";
import VolunteerShow from "./dataHandlers/VolunteerShow";
import VolunteerEdit from "./dataHandlers/VolunteerEdit";

const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="volunteers"
				list={VolunteerList}
				create={VolunteerCreate}
				edit={VolunteerEdit}
				show={VolunteerShow}
			/>
			<ReactQueryDevtools initialIsOpen={true} />
		</Admin>
	);
};

export default App;

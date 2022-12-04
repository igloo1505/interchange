import * as React from "react";
import {
	Admin,
	Resource,
	ListGuesser,
	SortButton,
	AddItemButton,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { ReactQueryDevtools } from "react-query/devtools";
import dataProvider from "./dataHandlers/dataProvider";
import VolunteerList from "./dataHandlers/VolunteerList";
import VolunteerCreate from "./dataHandlers/VolunteerCreate";

const App = () => (
	<Admin dataProvider={dataProvider}>
		<Resource name="volunteers" list={VolunteerList} create={VolunteerCreate} />
		<ReactQueryDevtools initialIsOpen={true} />
	</Admin>
);

export default App;

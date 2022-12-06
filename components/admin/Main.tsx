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
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="volunteers"
				list={VolunteerList}
				create={VolunteerCreate}
				edit={VolunteerEdit}
				show={VolunteerShow}
				recordRepresentation={(r) => `${r.name.first} ${r.name.last}`}
				icon={DirectionsRunIcon}
			/>
			<ReactQueryDevtools initialIsOpen={true} />
		</Admin>
	);
};

export default App;

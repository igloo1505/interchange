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
import BlindIcon from "@mui/icons-material/Blind";
import PatronList from "./dataHandlers/PatronList";
import PatronCreate from "./dataHandlers/PatronCreate";
import PatronEdit from "./dataHandlers/PatronEdit";
import PatronShow from "./dataHandlers/PatronShow";
import ContactList from "./dataHandlers/contact/ContactList";
import ContactShow from "./dataHandlers/contact/ContactShow";

const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="volunteers"
				list={VolunteerList}
				create={VolunteerCreate}
				edit={VolunteerEdit}
				show={VolunteerShow}
				recordRepresentation={(r) =>
					`${r.name.first ? r.name.first : ""} ${
						r.name.last ? r.name.last : ""
					} ${Boolean(!r.name.first && !r.name.last && r.email) ? r.email : ""}`
				}
				icon={DirectionsRunIcon}
			/>
			<Resource
				name="patrons"
				list={PatronList}
				create={PatronCreate}
				edit={PatronEdit}
				show={PatronShow}
				recordRepresentation={(r) =>
					`${r.name.first ? r.name.first : ""} ${
						r.name.last ? r.name.last : ""
					} ${Boolean(!r.name.first && !r.name.last && r.email) ? r.email : ""}`
				}
				icon={BlindIcon}
			/>
			<Resource
				name="contact"
				list={ContactList}
				show={ContactShow}
				recordRepresentation={(r) => `${r.name}`}
				icon={BlindIcon}
			/>
			<ReactQueryDevtools initialIsOpen={true} />
		</Admin>
	);
};

export default App;

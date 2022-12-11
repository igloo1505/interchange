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
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import ArticleIcon from "@mui/icons-material/Article";
import HoursList from "./dataHandlers/hours/HoursList";
import HoursShow from "./dataHandlers/hours/HoursShow";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HoursCreate from "./dataHandlers/hours/HoursCreate";
import FeaturedList from "./dataHandlers/featured/FeaturedList";
import FeaturedCreate from "./dataHandlers/featured/FeaturedCreate";
import FeaturedEventShow from "./dataHandlers/featured/FeaturedShow";

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
				icon={MarkunreadMailboxIcon}
			/>
			<Resource
				name="schedule"
				list={HoursList}
				show={HoursShow}
				create={HoursCreate}
				recordRepresentation={(r) => `${r.id}`}
				icon={ScheduleIcon}
			/>
			<Resource
				name="featured"
				list={FeaturedList}
				create={FeaturedCreate}
				show={FeaturedEventShow}
				recordRepresentation={(r) => `${r.title}`}
				icon={ArticleIcon}
			/>
			<ReactQueryDevtools initialIsOpen={true} />
		</Admin>
	);
};

export default App;

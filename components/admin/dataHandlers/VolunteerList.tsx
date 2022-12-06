import {
	List,
	Datagrid,
	TextField,
	NumberField,
	DateField,
	TopToolbar,
	FilterButton,
	CreateButton,
	ExportButton,
	TextInput,
	EmailField,
} from "react-admin";
import VolunteerShow from "./VolunteerShow";

const ListActions = () => {
	return (
		<TopToolbar>
			<FilterButton />
			<CreateButton />
			<ExportButton />
		</TopToolbar>
	);
};

const postFilters = [
	<TextInput label="Name" source="name" />,
	<TextInput label="Email" source="email" />,
];

const VolunteerList = () => {
	return (
		<List filters={postFilters} title="Volunteers">
			<Datagrid rowClick="show">
				<TextField source="name.first" about="First Name" label="First Name" />
				<TextField source="name.last" label="Last Name" />
				<EmailField source="email" label="Email" />
				<NumberField
					source="quote.index"
					label="Quote Index"
					about="Defines after which paragraph quote will appear if a quote exists."
				/>
				<TextField source="regularJob" label="Day Job" />
				<DateField source="datePosted" locales="cst" />
			</Datagrid>
		</List>
	);
};

export default VolunteerList;

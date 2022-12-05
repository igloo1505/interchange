import {
	List,
	Datagrid,
	TextField,
	NumberField,
	ReferenceField,
	DateField,
	TopToolbar,
	FilterButton,
	CreateButton,
	ExportButton,
	Button,
	TextInput,
	FunctionField,
	EmailField,
	ImageField,
	RichTextField,
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
			<Datagrid rowClick="edit">
				<TextField source="name.first" about="First Name" label="First Name" />
				<TextField source="name.last" label="Last Name" />
				<EmailField source="email" label="Email" />
				<NumberField
					source="quote.index"
					label="Quote Index"
					about="Defines after which paragraph quote will appear if a quote exists."
				/>
				<TextField source="regularJob" label="Day Job" />
				<FunctionField
					label="Description"
					source="description"
					render={(r) => {
						let x = r.description.join("");
						if (x.length > 47) {
							x = x.slice(0, 47);
							x += "...";
						}
						let s = { __html: x };
						return (
							<div
								dangerouslySetInnerHTML={s}
								style={{
									listStyle: "outside",
								}}
							></div>
						);
					}}
				/>
				<DateField source="datePosted" locales="cst" />
			</Datagrid>
		</List>
	);
};

export default VolunteerList;

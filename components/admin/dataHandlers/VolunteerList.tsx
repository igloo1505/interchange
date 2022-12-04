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
} from "react-admin";

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
	<TextInput label="Email" source="email" />,
	<TextInput label="Name" source="name" />,
];

const VolunteerList = () => {
	return (
		<List actions={<ListActions />} filters={postFilters} title="Volunteers">
			<Datagrid rowClick="edit">
				<TextField source="name.first" about="First Name" label="First Name" />
				<TextField source="name.last" label="Last Name" />
				<EmailField source="email" label="Email" />
				<NumberField
					source="quote.index"
					label="Quote Index"
					about="Defines after which paragraph quote will appear if a quote exists."
				/>
				<TextField
					source="quote.string"
					label="Quote"
					about="Optional quote to highlight what Interchange means to them."
				/>
				<TextField source="regularJob" label="Day Job" />
				<FunctionField
					label="Description"
					render={(r) => {
						let s = "";
						r.description.map((d: string, i: number, a: string[]) => {
							s += d;
							if (i < a.length - 1) {
								s += "\n";
							}
						});
						return s;
					}}
				/>
				<DateField source="datePosted" />
			</Datagrid>
		</List>
	);
};

export default VolunteerList;

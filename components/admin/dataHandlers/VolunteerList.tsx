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
import { useState, useEffect } from "react";

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
	<TextInput label="First Name" source="name.first" />,
	<TextInput label="Last Name" source="name.last" />,
	<TextInput label="Email" source="email" />,
];

const VolunteerList = () => {
	const [viewport, setViewport] = useState<number | undefined>();
	const handleViewport = () => {
		if (typeof window === "undefined") {
			return;
		}
		let w = window?.innerWidth;
		setViewport(w);
	};
	useEffect(() => {
		handleViewport();
		window?.addEventListener("resize", handleViewport);
	}, []);
	return (
		<List filters={postFilters} title="Volunteers">
			<Datagrid rowClick="show">
				<TextField source="name.first" about="First Name" label="First Name" />
				<TextField source="name.last" label="Last Name" />
				{viewport && viewport > 650 && (
					<EmailField source="email" label="Email" />
				)}
				{viewport && viewport > 850 && (
					<NumberField
						source="quote.index"
						label="Quote Index"
						about="Defines after which paragraph quote will appear if a quote exists."
					/>
				)}
				{viewport && viewport > 850 && (
					<TextField source="regularJob" label="Day Job" />
				)}
				<DateField source="datePosted" locales="cst" />
			</Datagrid>
		</List>
	);
};

export default VolunteerList;

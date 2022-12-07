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
	<TextInput label="Name" source="name" />,
	<TextInput label="Email" source="email" />,
];

const ContactList = () => {
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
		<List filters={postFilters} title="Contact Submissions" emptyWhileLoading>
			<Datagrid rowClick="show">
				<TextField source="name" about="Name" label="Name" />
				<TextField source="email" label="Email" />
				<TextField source="website" label="Website" />
				<DateField source="received" locales="cst" />
			</Datagrid>
		</List>
	);
};

export default ContactList;

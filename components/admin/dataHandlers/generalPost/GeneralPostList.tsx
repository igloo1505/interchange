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

const GeneralPostList = () => {
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
		<List filters={postFilters} title="Featured Events">
			<Datagrid rowClick="show">
				<TextField source="title" about="Title" label="Title" />
				<TextField source="location" label="Location" />
				<TextField source="url" label="URL" />
				<DateField source="autoExpire" locales="cst" label="Auto-Expire" />
				{viewport && viewport > 850 && (
					<DateField source="datePosted" label="Date Posted" />
				)}
			</Datagrid>
		</List>
	);
};

export default GeneralPostList;

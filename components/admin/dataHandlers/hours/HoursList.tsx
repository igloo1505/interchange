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
	FunctionField,
	useRecordContext,
	Labeled,
} from "react-admin";
import { useState, useEffect } from "react";
import { dayKeys, dayValues } from "../../../../utils/utilityFunctions";

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
	<TextInput label="Date" source="date" />,
];

const renderFunction = (r, index) => {
	if (r[dayKeys[index]]) {
		return `${r[dayKeys[index]]["open"].slice(
			0,
			r[dayKeys[index]]["open"].length - 3
		)}-${r[dayKeys[index]]["close"].slice(
			0,
			r[dayKeys[index]]["close"].length - 3
		)}`;
	}
	return "--";
};

const HoursList = () => {
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
		<List filters={postFilters} title="Schedule" emptyWhileLoading>
			<Datagrid rowClick="show">
				<FunctionField
					label={dayValues[0]}
					render={(r) => renderFunction(r, 0)}
				/>
				<FunctionField
					label={dayValues[1]}
					render={(r) => renderFunction(r, 1)}
				/>
				<FunctionField
					label={dayValues[2]}
					render={(r) => renderFunction(r, 2)}
				/>
				<FunctionField
					label={dayValues[3]}
					render={(r) => renderFunction(r, 3)}
				/>
				<FunctionField
					label={dayValues[4]}
					render={(r) => renderFunction(r, 4)}
				/>
				<FunctionField
					label={dayValues[5]}
					render={(r) => renderFunction(r, 5)}
				/>
				<FunctionField
					label={dayValues[6]}
					render={(r) => renderFunction(r, 6)}
				/>
			</Datagrid>
		</List>
	);
};

export default HoursList;

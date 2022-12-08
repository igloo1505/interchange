import * as React from "react";
import {
	Create,
	SimpleForm,
	TextInput,
	required,
	email,
	Labeled,
	TimeInput,
} from "react-admin";
import Box from "@mui/material/Box";
import { numberOnlyKeyDown } from "../../../../utils/utilityFunctions";

interface DayInterface {
	val: string;
	label: string;
}
const Day = ({ val, label }: DayInterface) => {
	return (
		<Labeled
			label={label}
			sx={{
				xs: {
					display: "grid",
					gridTemplateColumns: "110px auto auto",
					placeItems: "center",
				},
				gap: "0.5rem",
				"& .RaLabeled-label": {
					fontSize: "1.2rem",
				},
			}}
		>
			<Box display={{ xs: "flex", sm: "flex", width: "100%", gap: "0.75rem" }}>
				<Box flex={1} mr={{ xs: 0, sm: "0.5em", width: "100%" }}>
					<Labeled>
						<TimeInput
							source={`${val}.open`}
							label="Open"
							// validate={[required()]}
							fullWidth
						/>
					</Labeled>
				</Box>
				<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
					<Labeled>
						<TimeInput source={`${val}.close`} label="Close" fullWidth />
					</Labeled>
				</Box>
			</Box>
		</Labeled>
	);
};

const HoursCreate = () => {
	return (
		<Create>
			<SimpleForm
				mode="onBlur"
				reValidateMode="onBlur"
				sx={{
					marginBottom: "3rem",
				}}
			>
				<Day val="mon" label="Monday" />
				<Day val="tue" label="Tuesday" />
				<Day val="wed" label="Wednesday" />
				<Day val="thur" label="Thursday" />
				<Day val="fri" label="Friday" />
				<Day val="sat" label="Saturday" />
				<Day val="sun" label="Sunday" />
			</SimpleForm>
		</Create>
	);
};

export default HoursCreate;

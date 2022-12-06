import React from "react";
import {
	Edit,
	SimpleForm,
	TextInput,
	DateInput,
	ReferenceManyField,
	Datagrid,
	TextField,
	DateField,
	EditButton,
	required,
	NumberInput,
	useRecordContext,
} from "react-admin";
import RichText from "./RichText";
import Box from "@mui/material/Box";
import { numberOnlyKeyDown } from "../../../utils/utilityFunctions";
import { RichTextInput } from "ra-input-rich-text";

const VolunteerEdit = () => {
	return (
		<Edit
			sx={{
				"& .RaEdit-main": {
					margin: {
						xs: "0.25rem 0.5rem 6rem 0.5rem",
						sm: "0.25rem 0.5rem 2rem 0rem",
					},
				},
			}}
		>
			<SimpleForm>
				<TextInput disabled label="Id" source="id" />
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="name.first"
							// validate={required()}
							fullWidth
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="name.last"
							fullWidth
							// validate={required()}
						/>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="email"
							fullWidth
							// validate={required()}
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="regularJob"
							label="Day Job"
							fullWidth
							// validate={required()}
						/>
					</Box>
				</Box>

				<TextInput
					source="quote.string"
					label="Quote"
					fullWidth
					multiline
					// validate={required()}
				/>
				<RichText
					source="description"
					label="Their Story"
					// validate={required()}
				/>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<NumberInput
							source="quote.index"
							label="Quote Index"
							onKeyDown={numberOnlyKeyDown}
							// validate={required()}
							fullWidth
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<DateInput label="Date Posted" source="datePosted" fullWidth />
					</Box>
				</Box>
			</SimpleForm>
		</Edit>
	);
};

export default VolunteerEdit;

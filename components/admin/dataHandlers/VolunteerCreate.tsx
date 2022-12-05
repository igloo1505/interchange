import * as React from "react";
import {
	Create,
	SimpleForm,
	TextInput,
	DateInput,
	required,
	email,
} from "react-admin";
import Box from "@mui/material/Box";
import RichText from "./RichText";
import * as yup from "yup";
const VolunteerCreate = () => {
	return (
		<Create>
			<SimpleForm mode="onBlur" reValidateMode="onBlur">
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="name.first"
							label="First Name"
							// validate={[required()]}
							fullWidth
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="name.last"
							label="Last Name"
							// validate={[required()]}
							fullWidth
						/>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="email"
							label="Email"
							validate={[email()]}
							fullWidth
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="regularJob"
							label="Day Job"
							// validate={[required()]}
							fullWidth
						/>
					</Box>
				</Box>
				<RichText label="Their Story" source="description" />
			</SimpleForm>
		</Create>
	);
};

export default VolunteerCreate;

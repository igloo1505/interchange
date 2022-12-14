import * as React from "react";
import {
	Create,
	SimpleForm,
	TextInput,
	required,
	email,
	ImageInput,
	ImageField,
	DateInput,
} from "react-admin";
import Box from "@mui/material/Box";
import RichText from "../RichText";

const AccessCreate = () => {
	return (
		<Create>
			<SimpleForm mode="onBlur" reValidateMode="onBlur">
				<TextInput
					source="email"
					label="Email"
					validate={[required()]}
					fullWidth
				/>
				<DateInput source="autoExpire" label="Auto Expire" fullWidth />
			</SimpleForm>
		</Create>
	);
};

export default AccessCreate;

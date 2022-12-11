import * as React from "react";
import {
	Create,
	SimpleForm,
	TextInput,
	required,
	email,
	ImageInput,
	ImageField,
} from "react-admin";
import Box from "@mui/material/Box";
import RichText from "./RichText";
import { numberOnlyKeyDown } from "../../../utils/utilityFunctions";

const VolunteerCreate = () => {
	return (
		<Create>
			<SimpleForm mode="onBlur" reValidateMode="onBlur">
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="name.first"
							label="First Name"
							validate={[required()]}
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
							source="phone"
							label="Phone"
							fullWidth
							onKeyDown={numberOnlyKeyDown(["-"])}
						/>
					</Box>
				</Box>

				<TextInput
					source="regularJob"
					label="Day Job"
					// validate={[required()]}
					fullWidth
				/>
				<TextInput
					source="quote.string"
					label="Meaningful quote"
					// validate={[required()]}
					fullWidth
				/>
				<RichText label="Their Story" source="description" />
				<ImageInput
					source="image"
					label="Photo"
					accept={[".jpeg", ".jpg", ".png"]}
					multiple={true}
					name="image"
				>
					<ImageField source="src" title="filename" />
				</ImageInput>
			</SimpleForm>
		</Create>
	);
};

export default VolunteerCreate;

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
import { numberOnlyKeyDown } from "../../../../utils/utilityFunctions";

const FeaturedCreate = () => {
	return (
		<Create>
			<SimpleForm mode="onBlur" reValidateMode="onBlur">
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source="title"
							label="Title"
							validate={[required()]}
							fullWidth
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<DateInput source="autoExpire" label="Auto Expire" fullWidth />
					</Box>
				</Box>
				<TextInput
					source="url"
					label="Url"
					// validate={[email()]}
					fullWidth
				/>
				<TextInput source="location" label="Location" fullWidth />
				<RichText label="Description" source="description" />
				<ImageInput
					source="images"
					label="Photo"
					accept={[".jpeg", ".jpg", ".png"]}
					multiple={true}
					name="images"
				>
					<ImageField source="src" title="filename" />
				</ImageInput>
			</SimpleForm>
		</Create>
	);
};

export default FeaturedCreate;

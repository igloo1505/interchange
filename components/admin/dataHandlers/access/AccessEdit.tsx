import React, { useState, useEffect } from "react";
import {
	Edit,
	SimpleForm,
	TextInput,
	DateInput,
	PasswordInput,
	required,
} from "react-admin";
import Box from "@mui/material/Box";

const AccessEdit = () => {
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
			<SimpleForm mode="onBlur" reValidateMode="onBlur">
				<TextInput source="email" validate={[required()]} fullWidth />
				<DateInput
					source="autoExpire"
					label="Auto Expire"
					fullWidth
					// validate={required()}
				/>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							disabled
							label="Id"
							source="id"
							// style={{
							// 	width: viewport && viewport > 600 ? "50%" : "100%",
							// }}
							fullWidth
						/>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<DateInput
							label="Created On"
							source="createdAt"
							fullWidth
							disabled
						/>
					</Box>
				</Box>
			</SimpleForm>
		</Edit>
	);
};

export default AccessEdit;

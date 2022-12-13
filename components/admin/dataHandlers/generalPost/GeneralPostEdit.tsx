import React, { useState, useEffect } from "react";
import { Edit, SimpleForm, TextInput, DateInput, required } from "react-admin";
import RichText from "../RichText";
import Box from "@mui/material/Box";
import ImageEditField from "../../ImageEditField";

const GeneralPostEdit = () => {
	const [viewport, setViewport] = useState();
	const handleViewport = () => {
		if (typeof window === "undefined") {
			return;
		}
		let w = window.innerWidth;
		setViewport(w);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		handleViewport();
		window.addEventListener("resize", handleViewport);
	}, []);
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
				<ImageEditField
					source="image"
					label="Photo"
					resource="generalPost"
					fullWidth={true}
				/>
				<TextInput
					disabled
					label="Id"
					source="id"
					style={{
						width: viewport && viewport > 600 ? "50%" : "100%",
					}}
				/>
				<TextInput source="title" validate={required()} fullWidth />
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput source="location" fullWidth />
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<TextInput source="url" fullWidth />
					</Box>
				</Box>
				<RichText label="Content" source="description" />
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<DateInput label="Auto Expire" source="autoExpire" fullWidth />
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<DateInput label="Date Posted" source="datePosted" fullWidth />
					</Box>
				</Box>
			</SimpleForm>
		</Edit>
	);
};

export default GeneralPostEdit;

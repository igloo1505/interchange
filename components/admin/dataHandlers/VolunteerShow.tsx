import {
	Show,
	SimpleShowLayout,
	TextField,
	DateField,
	RichTextField,
	Labeled,
} from "react-admin";
import Box from "@mui/material/Box";
// import {RichTextField} from 'ra-input-rich-text'

const VolunteerShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<Box display={{ xs: "block", sm: "flex", width: "100%", mt: "1rem" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="name.first" label="First Name" fullWidth />
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="name.last" label="Last Name" fullWidth />
						</Labeled>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%", mt: "1rem" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="email" fullWidth />
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="regularJob" label="Day Job" fullWidth />
						</Labeled>
					</Box>
				</Box>

				<RichTextField source="description" fullWidth />
				<DateField label="Posted Date" source="datePosted" />
			</SimpleShowLayout>
		</Show>
	);
};

export default VolunteerShow;

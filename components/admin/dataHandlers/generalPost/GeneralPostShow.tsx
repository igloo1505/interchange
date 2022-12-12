import {
	Show,
	SimpleShowLayout,
	TextField,
	DateField,
	RichTextField,
	Labeled,
	// EmailField,
} from "react-admin";
import Box from "@mui/material/Box";
import PhoneFunctionField from "../../PhoneFunctionField";
import EmailField from "../../EmailField";
import QuoteField from "../../QuoteField";
import ImageShow from "../ImageShow";
// import {RichTextField} from 'ra-input-rich-text'

const FeaturedEventShow = () => {
	return (
		<Show emptyWhileLoading>
			<SimpleShowLayout>
				<ImageShow />
				<Box display={{ xs: "block", sm: "flex", width: "100%", mt: "1rem" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="title" label="Title" fullWidth />
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="url" label="Url" fullWidth />
						</Labeled>
					</Box>
				</Box>
				<Labeled>
					<TextField source="location" label="Location" fullWidth />
				</Labeled>
				<RichTextField source="description" fullWidth />
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<DateField
								label="Expires On"
								source="autoExpire"
								emptyText="Never"
							/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<DateField label="Posted Date" source="datePosted" />
						</Labeled>
					</Box>
				</Box>
			</SimpleShowLayout>
		</Show>
	);
};

export default FeaturedEventShow;

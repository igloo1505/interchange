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
import PhoneFunctionField from "../PhoneFunctionField";
import EmailField from "../EmailField";
import QuoteField from "../QuoteField";
import ImageShow from "./ImageShow";
// import {RichTextField} from 'ra-input-rich-text'

const PatronShow = () => {
	return (
		<Show emptyWhileLoading>
			<SimpleShowLayout>
				<ImageShow />
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
							<EmailField source="email" fullWidth />
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<PhoneFunctionField source="phone" label="Phone" fullWidth />
						</Labeled>
					</Box>
				</Box>
				<QuoteField
					source="quote.string"
					label="Something Meaningful"
					fullWidth
				/>
				<RichTextField source="description" fullWidth />
				<DateField label="Posted Date" source="datePosted" />
			</SimpleShowLayout>
		</Show>
	);
};

export default PatronShow;

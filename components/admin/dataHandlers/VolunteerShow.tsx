import {
	Show,
	SimpleShowLayout,
	TextField,
	DateField,
	RichTextField,
	Labeled,
	ImageField,
	useRecordContext,
	useShowContext,
	// EmailField,
} from "react-admin";
import Box from "@mui/material/Box";
import Image from "next/image";
import PhoneFunctionField from "../PhoneFunctionField";
import EmailField from "../EmailField";
import QuoteField from "../QuoteField";
import { Fragment } from "react";

// import {RichTextField} from 'ra-input-rich-text'

const ImageShow = () => {
	const showContext = useShowContext();
	let w =
		window?.innerWidth && window?.innerWidth < 640
			? window?.innerWidth * 0.8
			: 400;
	return (
		<Fragment>
			{showContext?.record?.image && (
				<div className="relative w-[200px] h-[200px]">
					<Image
						src={`/uploads/${showContext.record.image}`}
						alt="Volunteer Image"
						fill
						className="object-contain"
					/>
				</div>
			)}
		</Fragment>
	);
};

const VolunteerShow = () => {
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

export default VolunteerShow;

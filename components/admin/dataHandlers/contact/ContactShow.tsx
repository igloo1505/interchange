import {
	Show,
	SimpleShowLayout,
	TextField,
	DateField,
	RichTextField,
	Labeled,
	UrlField,
	Button,
	useShowContext,
	useRefresh,
	BooleanField,
	// EmailField,
} from "react-admin";
import Box from "@mui/material/Box";
import PhoneFunctionField from "../../PhoneFunctionField";
import EmailField from "../../EmailField";
import QuoteField from "../../QuoteField";
import ImageShow from "./../ImageShow";
import MarkRead from "@mui/icons-material/MarkChatRead";
import MarkUnread from "@mui/icons-material/MarkChatUnread";
import { Fragment } from "react";
import { toggleRead } from "../../../../state/actions";
// import {RichTextField} from 'ra-input-rich-text'

const ShowButton = () => {
	const context = useShowContext();
	const refresh = useRefresh();
	const handleButtonClick = async () => {
		if (!context.record.id || typeof context.record.read === "undefined")
			return;
		let success = await toggleRead(context.record.id, !context.record.read);
		if (success) refresh();
	};
	return (
		<Fragment>
			{context.record ? (
				<Button
					alignIcon="left"
					color="primary"
					label={context.record.read ? "Mark Unread" : "Mark Read"}
					onClick={handleButtonClick}
				>
					{context.record.read ? <MarkUnread /> : <MarkRead />}
				</Button>
			) : (
				<div></div>
			)}
		</Fragment>
	);
};

const PatronShow = () => {
	return (
		<Show emptyWhileLoading>
			<SimpleShowLayout>
				<ImageShow />
				<Box display={{ xs: "block", sm: "flex", width: "100%", mt: "1rem" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextField source="name" label="Name" fullWidth />
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<EmailField source="email" fullWidth />
						</Labeled>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%", mt: "1rem" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<UrlField source="website" fullWidth />
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<DateField source="received" label="Received On" fullWidth />
						</Labeled>
					</Box>
				</Box>
				<TextField source="comment" fullWidth />
				<div className="flex flex-row items-center justify-between">
					<Labeled>
						<BooleanField source="read" label="Read" />
					</Labeled>
					<ShowButton />
				</div>
			</SimpleShowLayout>
		</Show>
	);
};

export default PatronShow;

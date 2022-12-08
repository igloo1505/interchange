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
	FunctionField,
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

interface DayInterface {
	label: string;
	source: string;
}
const Day = ({ source, label }: DayInterface) => {
	return (
		<Box display={{ xs: "block", sm: "flex", width: "100%", mt: "1rem" }}>
			<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
				<Labeled>
					<TextField source={`${source}.open`} label="Open" fullWidth />
				</Labeled>
			</Box>
			<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
				<Labeled>
					<TextField source={`${source}.close`}  label="Close" fullWidth/>
				</Labeled>
			</Box>
		</Box>
	);
};

const HoursShow = () => {
	return (
		<Show emptyWhileLoading>
			<SimpleShowLayout>
				<Day source="mon" label="Monday" />
				<Day source="tue" label="Tuesday" />
				<Day source="wed" label="Wednesday" />
				<Day source="thur" label="Thursday" />
				<Day source="fri" label="Friday" />
				<Day source="sat" label="Saturday" />
				<Day source="sun" label="Sunday" />
			</SimpleShowLayout>
		</Show>
	);
};

export default HoursShow;

import {
	Show,
	SimpleShowLayout,
	TextField,
	DateField,
	RichTextField,
} from "react-admin";
// import {RichTextField} from 'ra-input-rich-text'

const VolunteerShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="name.first" />
				<TextField source="name.last" />
				<TextField source="email" />
				<RichTextField source="description" />
				<DateField label="Posted Date" source="datePosted" />
			</SimpleShowLayout>
		</Show>
	);
};

export default VolunteerShow;

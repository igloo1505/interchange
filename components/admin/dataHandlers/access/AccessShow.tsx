import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

const AccessShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="email" label="Email" />
				<DateField source="autoExpire" label="Auto Expire" />
			</SimpleShowLayout>
		</Show>
	);
};

export default AccessShow;

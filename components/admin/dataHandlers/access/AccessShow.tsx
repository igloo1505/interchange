import {
	Show,
	SimpleShowLayout,
	TextField,
	DateField,
	FunctionField,
} from "react-admin";

const AccessShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="email" label="Email" />
				<FunctionField
					source="password"
					label="Password"
					render={(r: any) => Array.from(`${r.password}`).map((v) => "*")}
				/>
				<DateField source="autoExpire" label="Auto Expire" />
			</SimpleShowLayout>
		</Show>
	);
};

export default AccessShow;

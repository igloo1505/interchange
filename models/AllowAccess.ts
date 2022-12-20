import { Schema, model, models } from "mongoose";
import checkIsValid from "../utils/checkIsValid";
import bcrypt from "bcrypt";

export interface AccessCredentialsInterface {
	email: string;
	password: string;
	autoExpire?: Date | (() => Date);
	validatePassword: (passwordAttempt: string) => Awaited<boolean>;
}

const AccessCredentialsSchema = new Schema<AccessCredentialsInterface>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: false,
		},
		autoExpire: {
			type: Date,
			required: false,
		},
	},
	{
		methods: {
			checkValid() {
				debugger;
				return checkIsValid(this);
			},
			async validatePassword(passwordAttempt: string) {
				return await bcrypt.compare(passwordAttempt, this.password);
			},
		},
		timestamps: true,
	}
);

AccessCredentialsSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(this.password, salt);
		console.log(`Password hashed as: ${hashedPassword}`);
		this.password = hashedPassword;
	}
	next();
});

export default models?.AccessCredentials ||
	model<AccessCredentialsInterface>(
		"AccessCredentials",
		AccessCredentialsSchema
	);

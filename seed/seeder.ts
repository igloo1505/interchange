import { seedFeaturedPosts } from "./featuredPosts";
import { seedGeneralPosts } from "./generalPosts";
import { seedPatrons } from "./patrons";
import { seedVolunteers } from "./volunteers";
import mongoose from "mongoose";

export const seedAll = async () => {
	let connectString = process.env.MONGO_URI;
	if (!connectString) {
		return console.log(
			"Failed with connect string for some inexplicable reason."
		);
	}
	let allSeeded = {};
	await mongoose
		.connect(connectString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(async () => {
			allSeeded["featuredPosts"] = await seedFeaturedPosts();
			allSeeded["generalPosts"] = await seedGeneralPosts();
			allSeeded["patrons"] = await seedPatrons();
			allSeeded["volunteers"] = await seedVolunteers();
		});
	return allSeeded;
};

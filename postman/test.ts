import newman from "newman";

newman.run(
	{
		collection: "/path/to/collection.json",
		reporters: ["htmlextra", "csv"],
	},
	process.exit()
);

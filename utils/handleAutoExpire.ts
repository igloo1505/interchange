import GeneralPost from "../models/GeneralPost";
import Featured from "../models/Featured";

const handleAutoExpire = async (modelArray: any[]) => {
	let now = Date.now();
	let filterIds: any = [];
	for (let i = 0; i < modelArray.length; i++) {
		const m = modelArray[i];
		if (m?.autoExpire && m.autoExpire <= now && m._id) {
			try {
				await GeneralPost.findByIdAndDelete(m._id);
			} catch (error) {
				console.log("error: ", error);
			}
			try {
				await Featured.findByIdAndDelete(m._id);
			} catch (error) {
				console.log("error: ", error);
			}
			filterIds.push(m._id);
		}
	}
	/// @ts-ignore
	return modelArray.filter((x) => filterIds.indexOf(x._id) === -1);
};

import Volunteer from "../models/Volunteer";
import Patron from "../models/Patron";
import Featured from "../models/Featured";
import GeneralPost from "../models/GeneralPost";
const removeModel = async (model: any) => {
	// model
	console.log("model: ", model);
	console.log("typeof model: ", typeof model);
	if (model instanceof Volunteer) {
		console.log("model instanceof Volunteer: ", model instanceof Volunteer);
		await model.clearImages();
		await Volunteer.findByIdAndDelete(model.id);
	}
	if (model instanceof Patron) {
		console.log("model instanceof Volunteer: ", model instanceof Patron);
		await model.clearImages();
		await Patron.findByIdAndDelete(model.id);
	}
	if (model instanceof Featured) {
		console.log("model instanceof Volunteer: ", model instanceof Featured);
		await model.clearImages();
		await Featured.findByIdAndDelete(model.id);
	}
	if (model instanceof GeneralPost) {
		console.log("model instanceof Volunteer: ", model instanceof GeneralPost);
		await model.clearImages();
		await GeneralPost.findByIdAndDelete(model.id);
	}
};

const formatDate = (date: Date) => {
	return {
		year: date.getFullYear(),
		day: date.getDate(),
		month: date.getMonth(),
	};
};

const compareDates = (expires: Date) => {
	let now = formatDate(new Date());
	let exp = formatDate(new Date(expires));
	console.log("now: ", now);
	console.log("exp: ", exp);
	if (exp.year > now.year) {
		return true;
	}
	if (exp.month > now.month) {
		return true;
	}
	if (exp.day > now.day) {
		return true;
	}
	return false;
};
const checkIsValid = async (model: any) => {
	debugger;
	let hasExpire = Boolean(model.autoExpire);
	if (!hasExpire) {
		return true;
	}
	let compared = compareDates(model.autoExpire);
	console.log("compared: ", compared);
	if (hasExpire && compared) {
		return true;
	}
	await removeModel(model);
	return false;
};

interface filterInvalidReturn {
	deleteCount: number;
	_data: Array<any>;
}
/// @ts-ignore
export const filterInvalid = async (arr: Array<any>): filterInvalidReturn => {
	let removedArray: any = [];
	for (let i = 0; i < arr.length; i++) {
		const x = arr[i];
		let isValid = await checkIsValid(x);
		if (!isValid) {
			removedArray.push(x);
		}
	}
	return {
		deleteCount: removedArray.length,
		_data: arr.filter(
			(a: any) => removedArray.map((b: any) => b.id).indexOf(a.id) === -1
		),
	};
};

export default checkIsValid;

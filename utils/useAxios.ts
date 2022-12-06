import axios, { AxiosProgressEvent } from "axios";
import store from "../state/store";
axios.defaults.headers.common = {
	"Content-Type": "application/json",
};
axios.defaults.onUploadProgress = (event: AxiosProgressEvent) => {
	console.log(
		`Current progress:`,
		/// @ts-ignore
		Math.round((event.loaded * 100) / event?.total)
	);
};
export enum methodEnum {
	post = "post",
	get = "get",
	put = "put",
	delete = "delete",
}

interface useAxiosInterface {
	method: methodEnum;
	url: string;
	data?: object;
	config?: object | any;
	headers?: object | any;
}

const useAxios = async ({
	method,
	url,
	data,
	config = {},
	headers,
}: useAxiosInterface) => {
	store.dispatch({
		type: "SET_IS_LOADING",
		payload: true,
	});
	let res: any = await axios({
		method: method,
		url: url,
		data: data,
		headers: headers || { "Content-Type": "application/json" },
		...config,
	});
	// TODO: handle loading state with return
	console.log("res", res);
	if (res.data.success) {
		return res;
	}
	if (res.data.consoleMessage) {
		console.log(res.data.consoleMessage);
		// TODO: handle display message
		console.log("Handle display message here...");
	}
};

export default useAxios;

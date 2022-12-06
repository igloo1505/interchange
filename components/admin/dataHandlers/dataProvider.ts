import {
	fetchUtils,
	GetListParams,
	GetOneParams,
	GetManyParams,
	GetManyReferenceParams,
	CreateParams,
	UpdateManyParams,
	UpdateParams,
	DeleteParams,
	DeleteManyParams,
	DataProvider,
} from "react-admin";
import { stringify } from "query-string";
// import axios, { useAxios } from "axios";
import { VolunteerInterface } from "../../../models/Volunteer";
import axios, { methodEnum } from "../../../utils/useAxios";

const dataProvider: DataProvider = {
	getList: async (resource: string, params: GetListParams) => {
		// debugger;
		console.log("getList", params);
		let query = {
			page: params.pagination.page,
			perPage: params.pagination.perPage,
			sortField: params.sort.field,
			sortOrder: params.sort.order,
			filter:
				Object.keys(params.filter).length > 0
					? JSON.stringify(params.filter)
					: "",
			meta:
				typeof params.meta !== "undefined" &&
				Object.keys(params.meta).length > 0
					? JSON.stringify(params.meta)
					: "",
		};
		// let res = await axios.get();
		let res = await axios({
			method: methodEnum.get,
			url: `/api/${resource}/get?${stringify(query)}`,
		});
		// console.log("res: (getList) ", res);
		return { data: res.data.response, total: res.data.total };
	},

	getOne: async (resource: string, params: GetOneParams) => {
		// debugger;
		console.log("getOne", params);
		let query = {
			id: params.id,
			meta:
				typeof params.meta !== "undefined" &&
				Object.keys(params.meta).length > 0
					? JSON.stringify(params.meta)
					: "",
		};
		// let res = await axios.get();
		let res = await axios({
			method: methodEnum.get,
			url: `/api/${resource}/get?${stringify(query)}`,
		});
		console.log("res.data?.result?.data[0]: ", res.data?.result?.data[0]);
		return { data: res.data?.response[0] };
	},

	getMany: async (resource: string, params: GetManyParams) => {
		// debugger;
		console.log("getMany", params);
		if (typeof params.ids === "undefined" || params.ids.length === 0) {
			return { data: [] };
		}
		let query = {
			ids: JSON.stringify(params.ids),
			meta:
				typeof params.meta !== "undefined" &&
				Object.keys(params.meta).length > 0
					? JSON.stringify(params.meta)
					: "",
		};
		// if(typeof )
		// let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
		let res = await axios({
			method: methodEnum.get,
			url: `/api/${resource}/get?${stringify(query)}`,
		});
		console.log("res: (getMany) ", res);
		return { data: res.data?.response };
	},

	getManyReference: async (
		resource: string,
		params: GetManyReferenceParams
	) => {
		// debugger;
		let query = {
			target: params.target,
			id: params.id,
			page: params.pagination.page,
			perPage: params.pagination.perPage,
			sortField: params.sort.field,
			sortOrder: params.sort.order,
			filter:
				Object.keys(params.filter).length > 0
					? JSON.stringify(params.filter)
					: "",
			meta:
				typeof params.meta !== "undefined" &&
				Object.keys(params.meta).length > 0
					? JSON.stringify(params.meta)
					: "",
		};
		let res = await axios({
			method: methodEnum.get,
			url: `/api/${resource}/get?${stringify(query)}`,
		});
		console.log("res: (getManyReference) ", res);
		return { data: res.data.response, total: res.data.total };
	},
	create: async (resource: string, params: CreateParams) => {
		// debugger;
		console.log("create", params);
		// let res = await axios.post(, params.data, {
		// 	headers: ,
		// });
		let res = await axios({
			method: methodEnum.post,
			url: `/api/${resource}/add`,
			data: params.data,
			headers: { "content-type": "multipart/form-data" },
		});
		console.log("res: (create)", res);
		return { data: res.data.result };
	},
	update: async (resource: string, params: UpdateParams) => {
		console.log("update: params: ", params);
		// const res = await axios.put();
		let res = await axios({
			method: methodEnum.put,
			url: `/api/${resource}/edit`,
			data: params,
		});
		return { data: res.data?.response[0] };
	},

	updateMany: async (resource: string, params: UpdateManyParams) => {
		console.log("updateMany", params);
		let res = await axios.put(`/api/${resource}/edit`, params);
		// TODO: change r: VolunteerInterface to VolunteerInterface | PatronInterface...
		return { data: res.data?.response?.map((r: VolunteerInterface) => r.id) };
	},

	delete: async (resource: string, params: DeleteParams) => {
		// debugger;
		console.log("delete", params);
		// let res = await axios.post(`/api/${resource}/remove`, );
		let res = await axios({
			method: methodEnum.post,
			url: `/api/${resource}/remove`,
			data: {
				id: params.id,
			},
		});
		return {
			data: res.data.response.length > 1 ? false : res.data.response[0],
		};
	},

	deleteMany: async (resource: string, params: DeleteManyParams) => {
		// debugger;
		console.log("deleteMany", params);
		let res = await axios({
			method: methodEnum.post,
			url: `/api/${resource}/remove`,
			data: {
				ids: params.ids,
			},
		});
		// TODO: change r: VolunteerInterface to VolunteerInterface | PatronInterface...
		return { data: res.data.response.map((r: VolunteerInterface) => r.id) };
	},
};

export default dataProvider;

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
import axios from "axios";
import { VolunteerInterface } from "../../../models/Volunteer";
axios.defaults.headers.common = {
	"Content-Type": "application/json",
};

// type returnType = {
// 	data: VolunteerInterface[];
// };

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
		let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
		console.log("res: (getList) ", res);
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
		let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
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
		let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
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
		let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
		console.log("res: (getManyReference) ", res);
		return { data: res.data.response, total: res.data.total };
	},
	create: async (resource: string, params: CreateParams) => {
		// debugger;
		console.log("create", params);
		let res = await axios.post(`/api/${resource}/add`, params.data);
		console.log("res: (create)", res);
		return { data: res.data.result };
	},
	update: async (resource: string, params: UpdateParams) => {
		// debugger;
		console.log("update", params);
		// const query = {};
		// const res = await axios.put(`/api/${resource}/`);
		// return { data: {} };
	},

	updateMany: async (resource: string, params: UpdateManyParams) => {
		// debugger;
		console.log("updateMany", params);
		// return only ids
		// return { data: [] };
	},

	delete: async (resource: string, params: DeleteParams) => {
		// debugger;
		console.log("delete", params);
		let res = await axios.post(`/api/${resource}/remove`, {
			id: params.id,
		});
		return {
			data: res.data.response.length > 1 ? false : res.data.response[0],
		};
	},

	deleteMany: async (resource: string, params: DeleteManyParams) => {
		// debugger;
		console.log("deleteMany", params);
		let res = await axios.post(`/api/${resource}/remove`, {
			ids: params.ids,
		});
		return { data: res.data.response.map((r: VolunteerInterface) => r.id) };
	},
};

export default dataProvider;

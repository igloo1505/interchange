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
} from "react-admin";
import { stringify } from "query-string";
import axios from "axios";
import { VolunteerInterface } from "../../../models/Volunteer";
axios.defaults.headers.common = {
	"Content-Type": "application/json",
};

type returnType = {
	data: VolunteerInterface[];
};

export default {
	getList: async (resource: string, params: GetListParams) => {
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
		console.log("res.data.result: ", res.data.result);
		return { data: res.data.result.data, total: res.data.result.total };
	},

	getOne: async (resource: string, params: GetOneParams) => {
		let query = {
			id: params.id,
			meta:
				typeof params.meta !== "undefined" &&
				Object.keys(params.meta).length > 0
					? JSON.stringify(params.meta)
					: "",
		};
		let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
		return res.data;
	},

	getMany: async (resource: string, params: GetManyParams) => {
		let query = {
			ids: JSON.stringify(params.ids),
			meta:
				typeof params.meta !== "undefined" &&
				Object.keys(params.meta).length > 0
					? JSON.stringify(params.meta)
					: "",
		};
		let res = await axios.get(`/api/${resource}/get?${stringify(query)}`);
		return res.data;
	},

	getManyReference: async (
		resource: string,
		params: GetManyReferenceParams
	) => {
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
		return res.data;
	},
	create: async (resource: string, params: CreateParams) => {
		let res = await axios.post(`/api/${resource}/add`, params.data);
		return { data: res.data.result };
	},

	update: (resource: string, params: UpdateParams) => {},

	updateMany: (resource: string, params: UpdateManyParams) => {},

	delete: async (resource: string, params: DeleteParams) => {
		let res = await axios.post(`/api/${resource}/remove`, {
			id: params.id,
		});
		console.log("res.data.result: ", res.data.result);
		return { data: res.data.result.length > 1 ? false : res.data.result[0] };
	},

	deleteMany: async (resource: string, params: DeleteManyParams) => {
		let res = await axios.post(`/api/${resource}/remove`, {
			ids: params.ids,
		});
		console.log("res.data.result (many): ", res.data.result);
		return { data: res.data.result.map((r) => r.id) };
	},
};

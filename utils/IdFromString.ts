let allowable =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
export const getIdFromString = (text: string) => {
	let allow = Array.from(allowable);
	return Array.from(text)
		.map((l) => (allow.indexOf(l) < 0 ? "" : l))
		.join("");
};

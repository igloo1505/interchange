import { KeyboardEvent } from "react";

export const splitByLinebreak = (string: string) => {
	// let s = ""
	// for (var i = 0; i < string.length; i ++){
	// 	if(string[i] === "<" && i !== string.length - 1){
	// 		if(string[i + 1] === "p"){
	// 			let sub = string.slice(i, string.length - 1)
	// 			// sub.search()
	// 		}
	// 	}
	// }
	return (
		string
			.split("</p>")
			// .filter((x) => x.length !== 0 && x !== "<p>")
			.filter((x) => x.length !== 0)
			.map((x) => {
				return (x += "</p>");
			})
	);
};

export const numberOnlyKeyDown = (e: KeyboardEvent) => {
	let allowedKeys = [
		"Tab",
		"Backspace",
		"Shift",
		"ArrowLeft",
		"ArrowRight",
		"ArrowUp",
		"ArrowDown",
		"Meta",
		"Control",
		"Alt",
		"CapsLock",
	];
	if (Number.isNaN(parseInt(e.key)) && allowedKeys.indexOf(e.key) < 0) {
		e.preventDefault();
		e.stopPropagation();
		return console.log("disallow", e.key);
	}
};

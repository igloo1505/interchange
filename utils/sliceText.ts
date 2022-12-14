export const filterTags = ({
	text,
	brokenArray = false,
}: {
	text: string;
	brokenArray?: boolean;
}): string | string[] => {
	// debugger;
	if (!text) return;
	let lineBreaks = ["</p>", "</div>", "</u>", "<br>"];
	let _text = [""];
	let a = Array.from(text);
	let isOpen = false;
	const checkBreak = (index: number) => {
		let shouldBreak = false;
		lineBreaks.forEach((l) => {
			let slice = text.slice(index - l.length + 1, index + 1);
			if (lineBreaks.indexOf(slice) !== -1) {
				shouldBreak = true;
			}
		});
		return shouldBreak;
	};
	a.forEach((t, i) => {
		let openTag = t === "<" && t[i + 1] !== "/";
		let closeTag = t === "<" && t[i + 1] === "/";
		if (openTag) {
			isOpen = true;
		}
		if (!isOpen) {
			_text[_text.length - 1] += t;
		}
		if (isOpen && t === ">") {
			let shouldBreak = checkBreak(i);
			isOpen = false;
			if (brokenArray && shouldBreak) {
				_text.push("");
			}
			if (!brokenArray && shouldBreak) {
				_text[_text.length - 1] += " ";
			}
		}
	});
	return brokenArray ? _text : _text[0];
};

export const sliceText = (text: string | string[], length: number) => {
	if (!text) return;
	return text.length > length - 3 ? `${text.slice(0, length - 3)}...` : text;
};

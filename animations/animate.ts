export enum baseClassEnum {
	basic = "baseAnimate",
}
interface animateInterface {
	id: string;
	animation: string;
	baseClass?: baseClassEnum;
}

const animateCSS = async ({
	id,
	animation,
	baseClass = baseClassEnum.basic,
}: animateInterface) =>
	await new Promise((resolve, reject) => {
		const node = document.getElementById(id);
		if (!node) return;
		node.classList.add(baseClass, animation);
		function handleAnimationEnd(event: any) {
			event.stopPropagation();
			// if (!node) return;
			/// @ts-ignore
			node.classList.remove(baseClass, animation);
			resolve("Animation ended");
		}

		node.addEventListener("animationend", handleAnimationEnd, { once: true });
	});

export default animateCSS;

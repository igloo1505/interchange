import { MouseEvent } from "react";
import gsap from "gsap";

const bShadow = {
	fx: 5,
	fy: 5,
	fos: 13,
	foc: "#64748b",
	bx: -5,
	by: -5,
	bos: 13,
	boc: "#94a3b8",
};

const animateMouseLeave = (e) => {
	gsap.to(`#${e.target.id}`, {
		boxShadow: `${bShadow.fx}px ${bShadow.fy}px ${bShadow.fos}px #64748b, ${bShadow.bx}px ${bShadow.by}px ${bShadow.bos}px #94a3b8`,
		rotateX: 0,
		rotateY: 0,
		duration: 2.5,
		ease: "elastic.out(1.2, 0.2)",
	});
};

const inRange = (n: number) => {
	return Boolean(n >= -1 && n <= 1);
};
const getGeo = (
	e: MouseEvent,
	id: string
): { offset: { x: number; y: number }; id: string; rect: any } | boolean => {
	let _em = document.getElementById(id);
	if (!_em) return false;
	let rec = _em.getBoundingClientRect();
	let em = {
		center: {
			x: rec.x + rec.width / 2,
			y: rec.y + rec.height / 2,
		},
	};
	let offset = {
		x: (e.pageX - window.scrollX - em.center.x) / (rec.width / 2),
		y: (e.pageY - window.scrollY - em.center.y) / (rec.height / 2),
	};
	if (inRange(offset.x) && inRange(offset.y)) {
		return {
			offset,
			id,
			rect: rec,
		};
	}
	return false;
};
export const hoverAnimationMove = (e: MouseEvent, _ids: string[]) => {
	let ids = _ids.map((d) => `share-button-${d}`);
	let geo: any = ids.map((_id) => getGeo(e, _id)).filter((x) => x);
	if (geo.length === 0 || !geo) return;
	geo = geo[0];
	console.log("geo: ", geo);
	let em = document.getElementById(geo.id);
	if (!em) return;
	let rec = em.getBoundingClientRect();
	let offset = geo.offset;
	// actual implementation
	let maxRotate = 12;

	let factor = 0.2;
	const _nbs = {
		fx: 25 * (1 - offset.x) * factor,
		fy: 25 * (1 - offset.y) * factor,
		bx: -25 * (1 + offset.x) * factor,
		by: -25 * (1 + offset.y) * factor,
		fos: 14,
		bos: 14,
	};
	let _r = (geo.rect.width / 2 + geo.rect.height / 2) / 2;
	const boxShadow = `${_nbs.fx}px ${_nbs.fy}px ${_nbs.fos}px #64748b, ${_nbs.bx}px ${_nbs.by}px ${_nbs.bos}px #94a3b8`;
	gsap.to(`#${geo.id}`, {
		boxShadow: boxShadow,
		rotateX: `${Math.floor(offset.y * maxRotate)}deg`,
		rotateY: `${Math.floor(offset.x * maxRotate)}deg`,
		perspective: `500px`,
		duration: 0.35,
		ease: "back.out(2.0)",
	});
};

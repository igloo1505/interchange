import React, { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";

const connector = connect((state: RootState, props) => ({
	viewport: state.UI.dimensions.viewport,
	props: props,
}));

interface ImageGalleryProps {
	images: { path: string; publicUrl: string }[];
	animated?: boolean;
	animatedDelay?: number;
	primaryImageIndex?: number;
	viewport: typeof initialState.UI.dimensions.viewport;
}

const GalleryMainImage = connector(
	({
		image,
		viewport,
		isActive,
		index,
		activeIndex,
	}: {
		image: { path: string; publicUrl: string };
		viewport: typeof initialState.UI.dimensions.viewport;
		isActive: boolean;
		index: number;
		activeIndex: number;
	}) => {
		const [wasActive, setWasActive] = useState(false);
		const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex);
		let _id = `gallery-main-image-${index}`;
		useEffect(() => {
			let toRight = activeIndex > lastActiveIndex;
			if (wasActive && !isActive) {
				let tl = gsap.timeline();
				tl.to(`#${_id}`, {
					opacity: 0,
					x: toRight ? "-100%" : "100%",
					// scale: 0,
					duration: 0.75,
					ease: "power4.out",
				});
			}
			if (!wasActive && isActive) {
				let tl = gsap.timeline();
				tl.fromTo(
					`#${_id}`,
					{
						x: toRight ? "100%" : "-100%",
					},
					{
						opacity: 1,
						x: 0,
						duration: 0.75,
						delay: 0.25,
						ease: "power4.out",
					}
				);
			}
			setWasActive(isActive);
			setLastActiveIndex(activeIndex);
		}, [isActive, activeIndex]);
		return (
			<Image
				src={image.publicUrl}
				alt="Gallery Image"
				width={viewport.width * 0.8 || 1080}
				height={viewport.height * 0.8 || 1080}
				className={clsx(
					"max-h-full max-w-full h-full w-auto absolute object-contain opacity-0 rounded-sm shadow-md hover:shadow-sm transition-shadow duration-300",
					isActive ? "z-[100]" : "z-[1]"
				)}
				id={_id}
			/>
		);
	}
);
interface ScrollingSelectorProps {
	images: { path: string; publicUrl: string }[];
	activeImageIndex: number;
	setActiveImageIndex: (number) => void;
}

const GallerySliderImage = ({
	image,
	proportionalWidth,
	isActive,
	setActive,
	id,
}: {
	image: { path: string; publicUrl: string };
	proportionalWidth: number;
	isActive: boolean;
	id: string;
	setActive: () => void;
}) => {
	return (
		<Image
			src={image.publicUrl}
			alt="Gallery Slider Image Preview"
			width={proportionalWidth ? proportionalWidth - 16 : 150}
			height={proportionalWidth ? proportionalWidth - 16 : 150}
			id={id}
			className={clsx(
				"object-cover max-h-full h-full w-auto rounded-sm transition-all duration-300",
				!isActive && "shadow-lg hover:shadow-sm hover:scale-[0.97]"
			)}
			style={{
				...(proportionalWidth && { width: `${proportionalWidth}px` }),
				...(proportionalWidth && { height: `${proportionalWidth}px` }),
				opacity: isActive ? 0.6 : 1,
				cursor: isActive ? "default" : "pointer",
			}}
			onClick={() => setActive()}
		/>
	);
};

interface emInterface {
	em: HTMLElement;
	rect: DOMRect;
}

export const ImageGalleryScrollingSelector = ({
	images,
	activeImageIndex,
	setActiveImageIndex,
}: ScrollingSelectorProps) => {
	const [maxScrollWidth, setMaxScrollWidth] = useState(0);
	const [scrollPosition, setScrollPosition] = useState(null);
	const [proportionalWidth, setProportionalWidth] = useState(0);
	const handleScrollPosition = (nImages: number, activeIndex: number) => {
		if (typeof window === "undefined") {
			return;
		}
		let container: emInterface = {
			em: document.getElementById(
				"image-gallery-scroll-selector-container"
			) as HTMLElement,
			rect: document
				.getElementById("image-gallery-scroll-selector-container")
				?.getBoundingClientRect() as DOMRect,
		};
		let inner: emInterface = {
			em: document.getElementById(
				"image-gallery-scroll-selector-inner"
			) as HTMLElement,
			rect: document
				.getElementById("image-gallery-scroll-selector-inner")
				?.getBoundingClientRect() as DOMRect,
		};
		let ar: emInterface = {
			em: document.getElementById(
				"image-gallery-scroll-arrow-right"
			) as HTMLElement,
			rect: document
				.getElementById("image-gallery-scroll-arrow-right")
				?.getBoundingClientRect() as DOMRect,
		};
		let al: emInterface = {
			em: document.getElementById(
				"image-gallery-scroll-arrow-left"
			) as HTMLElement,
			rect: document
				.getElementById("image-gallery-scroll-arrow-left")
				?.getBoundingClientRect() as DOMRect,
		};

		if (!container || !inner || !ar || !al) return;
		let imageEms: emInterface[] = [];
		for (let i = 0; i < nImages; i++) {
			let em = document.getElementById(`gallery-slider-image-preview-${i}`);
			if (!em) return;
			imageEms.push({
				em: em,
				rect: em.getBoundingClientRect(),
			});
		}
		let maxTransformLeft =
			///@ts-ignore
			document
				?.getElementById("image-gallery-scroll-arrow-left")
				?.getBoundingClientRect().x +
			al.rect.width -
			/// @ts-ignore
			document
				?.getElementById("gallery-slider-image-preview-0")
				?.getBoundingClientRect().x;
		let maxTransformRight =
			/// @ts-ignore
			document
				?.getElementById(`gallery-slider-image-preview-${nImages - 1}`)
				?.getBoundingClientRect().x +
			imageEms[nImages - 1].rect.width -
			///@ts-ignore
			document
				?.getElementById("image-gallery-scroll-arrow-right")
				?.getBoundingClientRect().x;

		console.log("maxTransform: ", maxTransformLeft, maxTransformRight);
		let innerWidth = container.rect.width - ar.rect.width - al.rect.right;
		let overflow = inner.rect.width - innerWidth;
		let widthSum =
			imageEms.map((em) => em.rect.width).reduce((a, b) => a + b, 0) +
			16 * nImages;
		let fullyInView = imageEms.map((em) => {
			let d: any = {
				...em,
				transformIntoView: {
					left: al.rect.x + al.rect.width - em.rect.x,
					right: em.rect.x + em.rect.width - ar.rect.x,
				},
			};
			d.isFullyInView =
				d.transformIntoView.left <= 0 && d.transformIntoView.right <= 0;
			return d;
		});
		console.log(fullyInView[activeIndex]);
		console.log("innerWidth: ", innerWidth, overflow, widthSum);
		if (!fullyInView[activeImageIndex].isFullyInView) {
			let ac = fullyInView[activeImageIndex];
			let currentTransform = parseFloat(
				`${inner.em.style.transform}`.substring(
					`${inner.em.style.transform}`.indexOf("(") + 1,
					`${inner.em.style.transform}`.indexOf("px)")
				)
			);
			console.log("currentTransform: ", currentTransform);
			// debugger;
			if (ac.transformIntoView.left >= 0) {
				inner.em.style.transform = `translateX(${
					currentTransform && !Number.isNaN(currentTransform)
						? currentTransform + ac.transformIntoView.left
						: ac.transformIntoView.left
				}px)`;
			}
			if (ac.transformIntoView.right >= 0) {
				inner.em.style.transform = `translateX(${
					currentTransform && !Number.isNaN(currentTransform)
						? currentTransform - ac.transformIntoView.right
						: `-${ac.transformIntoView.right}`
				}px)`;
			}
		}
	};
	const handleWidth = () => {
		if (typeof window === "undefined") {
			return;
		}
		let em = document.getElementById("image-gallery-scroll-selector-container");
		if (!em) return;
		setProportionalWidth(em.getBoundingClientRect().height);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		handleWidth();
		window.addEventListener("resize", handleWidth);
	}, []);
	useEffect(() => {
		if (typeof window !== "undefined" && images && images.length > 0) {
			handleScrollPosition(images.length, activeImageIndex);
		}
	}, [activeImageIndex, images]);

	const handleScroll = (dir: "+" | "-") => {
		if (dir === "+") {
			setActiveImageIndex(
				activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1
			);
		}
		if (dir === "-") {
			setActiveImageIndex(
				activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1
			);
		}
	};
	return (
		<div className="w-full flex flex-row justify-center items-center h-full">
			<div
				className="grid h-full w-fit max-w-full place-items-center overflow-hidden"
				id="image-gallery-scroll-selector-container"
				style={{
					gridTemplateColumns:
						images.length >= maxScrollWidth ? "auto 1fr auto" : "1fr",
				}}
			>
				{images.length >= maxScrollWidth && (
					<div
						className="bg-white w-fit z-[9999] h-full flex justify-center items-center"
						id="image-gallery-scroll-arrow-left"
					>
						<div
							className="bg-primary-700 h-full w-[36px] z-[10000] flex flex-col justify-center items-center cursor-pointer mx-2 hover:bg-primary-600 transition-all duration-300"
							onClick={() => handleScroll("-")}
							style={{
								borderTopLeftRadius: "6px",
								borderBottomLeftRadius: "6px",
								height: "calc(100% - 1rem)",
							}}
						>
							<ArrowBackIosIcon className="fill-white text-white cursor-pointer w-full text-center ml-2" />
						</div>
					</div>
				)}
				<div
					className="w-fit max-h-full flex flex-row justify-center items-center gap-2 transition-transform duration-500"
					style={{
						height: "calc(100% - 1.75rem)",
					}}
					id="image-gallery-scroll-selector-inner"
				>
					{images.map((im, i) => (
						<GallerySliderImage
							image={im}
							key={`gallery-slider-image-${i}`}
							proportionalWidth={proportionalWidth}
							isActive={i === activeImageIndex}
							setActive={() => setActiveImageIndex(i)}
							id={`gallery-slider-image-preview-${i}`}
						/>
					))}
				</div>
				{images.length >= maxScrollWidth && (
					<div
						className="bg-white w-fit z-[9999] h-full flex justify-center items-center"
						id="image-gallery-scroll-arrow-right"
					>
						<div
							className="bg-primary-700 h-full w-[36px] z-[10000] flex flex-col justify-center items-center cursor-pointer mx-2 hover:bg-primary-600 transition-all duration-300"
							onClick={() => handleScroll("+")}
							style={{
								borderTopRightRadius: "6px",
								borderBottomRightRadius: "6px",
								height: "calc(100% - 1rem)",
							}}
						>
							<ArrowForwardIosIcon className="fill-white text-white cursor-pointer w-full text-center indent-0" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const ImageGallery = connector(
	({
		images,
		animated = true,
		animatedDelay = 500,
		primaryImageIndex = 0,
		viewport,
	}: ImageGalleryProps) => {
		const [activeImageIndex, setActiveImageIndex] = useState(primaryImageIndex);
		return (
			<div
				className="w-full gap-2 grid my-3"
				style={{
					gridTemplateRows: images.length > 1 ? "80% 20%" : "1fr",
					height: images.length > 1 ? "100%" : "fit-content",
				}}
			>
				<div
					className="grid place-items-center relative w-full"
					style={{
						height: images.length > 1 ? "100%" : "fit-content",
					}}
				>
					{images &&
						(images.length > 1 ? (
							images.map((im, i) => (
								<GalleryMainImage
									image={im}
									key={`gallery-main-image-${i}`}
									isActive={activeImageIndex === i}
									index={i}
									activeIndex={activeImageIndex}
								/>
							))
						) : (
							<div className="max-w-[768px] h-auto">
								<Image
									src={images[0].publicUrl}
									alt="Image Gallery Interchange Food Pantry"
									width={viewport.width || 1440}
									height={viewport.height || 1440}
									className="max-w-full max-h-[400px] object-contain"
								/>
							</div>
						))}
				</div>
				{images.length > 1 && (
					<ImageGalleryScrollingSelector
						images={images}
						activeImageIndex={activeImageIndex}
						setActiveImageIndex={setActiveImageIndex}
					/>
				)}
			</div>
		);
	}
);

export default ImageGallery;

import React, { useState, useEffect } from "react";
import Slider from "../slider/Slider";
import { ImageInterface } from "../../utils/imageHandler";
import Image from "next/image";
import gsap from "gsap";

interface ImageSliderProps {
	images: ImageInterface[];
	animated?: boolean;
	animatedDelay?: number;
}

const ImageCard = ({ image }: { image: ImageInterface }) => {
	return (
		<Image src={image.publicUrl} alt="Image" fill className="object-cover" />
	);
};

const ImageSlider = ({
	images,
	animated = false,
	animatedDelay,
}: ImageSliderProps) => {
	useEffect(() => {
		if (animated) {
			setTimeout(() => {
				let tl = gsap.timeline();
				tl.to(".image-slider-wrapper", {
					scale: 1,
					duration: 1,
					ease: "elastic.out(1, 0.9)",
				});
			}, animatedDelay || 1000);
		}
	}, []);
	return (
		<div className="w-full flex justify-center items-center">
			<div
				style={{
					...(animated && { transform: "scale(0, 0)" }),
					maxWidth: "max(980px, 85%)",
				}}
				className="image-slider-wrapper origin-center w-full flex justify-center items-center"
			>
				<Slider
					cards={
						images
							? images.map((im, i) => (
									<ImageCard image={im} key={`image-card-${i}`} />
							  ))
							: []
					}
					hideButtons={images.length === 1}
				/>
			</div>
		</div>
	);
};

export default ImageSlider;

import Image from "next/image";
import React from "react";

interface CardImageProps {
	imageUrl: string;
	alt?: string;
}

const CardImage = ({ imageUrl, alt = "image" }: CardImageProps) => {
	return (
		<div className="flex-grow flex flex-col justify-center items-center py-1">
			<Image
				src={imageUrl}
				alt={alt}
				width={250}
				height={250}
				className="w-auto max-h-full rounded-sm object-contain"
			/>
		</div>
	);
};

export default CardImage;

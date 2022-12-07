import React, { Fragment } from "react";
import Image from "next/image";
import { useShowContext } from "react-admin";

// interface ImageShowProps {

// }

const ImageShow = () => {
	const showContext = useShowContext();
	let w =
		window?.innerWidth && window?.innerWidth < 640
			? window?.innerWidth * 0.8
			: 400;
	return (
		<Fragment>
			{showContext?.record?.image && (
				<div className="relative w-[200px] h-[200px]">
					<Image
						src={`/uploads/${showContext.record.image}`}
						alt="Volunteer Image"
						fill
						className="object-contain"
					/>
				</div>
			)}
		</Fragment>
	);
};

export default ImageShow;

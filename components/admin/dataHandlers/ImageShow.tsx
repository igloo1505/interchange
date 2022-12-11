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
			{showContext?.record?.images && (
				<div
					className="grid"
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
						placeItems: "center",
					}}
				>
					{showContext?.record?.images.map((img: string) => {
						return (
							<div className="relative w-[150px] h-[150px]">
								<Image
									src={`/uploads/${img}`}
									alt="Event Image"
									fill
									className="object-contain"
								/>
							</div>
						);
					})}
				</div>
			)}
		</Fragment>
	);
};

export default ImageShow;

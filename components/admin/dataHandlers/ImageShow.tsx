import React, { Fragment } from "react";
import Image from "next/image";
import { useShowContext } from "react-admin";

const ImageShow = () => {
	const showContext = useShowContext();
	let w =
		window?.innerWidth && window?.innerWidth < 640
			? window?.innerWidth * 0.8
			: 400;
	return (
		<Fragment>
			{showContext?.record?.images && (
				<div
					className="grid"
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
						placeItems: "center",
					}}
				>
					{showContext?.record?.images.map(
						(img: { path: string; publicUrl: string }) => {
							return (
								<div className="relative w-[150px] h-[150px]">
									{img.publicUrl && (
										<Image
											src={`${img.publicUrl}`}
											alt="Event Image"
											fill
											className="object-contain"
										/>
									)}
								</div>
							);
						}
					)}
				</div>
			)}
		</Fragment>
	);
};

export default ImageShow;

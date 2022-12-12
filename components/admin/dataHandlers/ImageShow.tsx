import React, { Fragment } from "react";
import Image from "next/image";
import { useShowContext } from "react-admin";
import clsx from "clsx";

const ImageShow = () => {
	const showContext = useShowContext();
	let w =
		window?.innerWidth && window?.innerWidth < 640
			? window?.innerWidth * 0.8
			: 400;
	console.log("showContext: ", showContext);
	let primaryIndex = showContext.record.primaryImageIndex || 0;
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
						(img: { path: string; publicUrl: string }, i: number) => {
							return (
								<div
									className={
										"relative w-auto max-h-[150px] flex flex-col justify-center items-center"
									}
								>
									{img.publicUrl && (
										<Image
											src={`${img.publicUrl}`}
											alt="Event Image"
											width={150}
											height={150}
											className={clsx(
												"object-contain imageShow w-auto max-h-[150px]",
												primaryIndex === i && "imageShow-primary"
											)}
											style={{
												height: "fit-content !important",
											}}
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

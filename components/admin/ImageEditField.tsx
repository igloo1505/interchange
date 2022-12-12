import {
	ImageInput,
	ImageField,
	WithRecord,
	useEditContext,
	useRefresh,
} from "react-admin";
import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { clearImage, setPrimaryImageIndex } from "../../utils/clearImage";
import clsx from "clsx";
interface ImageEditFieldProps {
	source: string;
	label: string;
	resource: string;
	fullWidth?: boolean;
}

const ImageWrapper = ({
	filename,
	record,
	label,
	resource,
	_index,
	path,
}: {
	filename: string;
	label: string;
	resource: string;
	record: any;
	_index: number;
	path: string;
}) => {
	const refresh = useRefresh();
	let currentImageIndex = record.primaryImageIndex || 0;
	let isPrimary = currentImageIndex === _index;
	const handleClearImage = async () => {
		let res = await clearImage({
			id: record.id,
			resource: resource,
			filename: filename,
			path: path,
		});
		console.log("res: ", res);
		if (res.data.success) {
			refresh();
		}
	};
	const handleImageIndex = async () => {
		let res = await setPrimaryImageIndex({
			id: record.id,
			resource: resource,
			index: _index,
			path: path,
		});
		console.log("res: ", res);
		if (res.data.success) {
			refresh();
		}
	};

	return (
		<div
			className={clsx(
				"flex flex-col justify-between items-center px-2 py-2 rounded border border-sky-200 shadow-md bg-gray-100 gap-2 h-full",
				isPrimary && "imageShow-card-primary"
			)}
			// style={{
			// 	border: "1px solid #0369a1",
			// }}
		>
			<div className="w-auto max-h-[150px] relative editImageContainer flex justify-center items-center flex-col flex-grow">
				<Image
					src={filename}
					alt={"Person"}
					width={150}
					height={150}
					className={clsx("z-50 object-contain imageShow w-auto max-h-[150px]")}
				/>
			</div>
			<div className="grid grid-cols-2 w-full gap-3">
				<div
					className="bg-red-700 text-white text-center px-2 py-2 cursor-pointer flex flex-col justify-center items-center tracking-tighter leading-tight"
					onClick={handleClearImage}
				>
					Delete
				</div>
				{isPrimary ? (
					<div className="text-sky-700 px-2 py-2 flex flex-col justify-center items-center tracking-tighter leading-tight text-center select-none">
						Primary Image
					</div>
				) : (
					<div
						className="bg-sky-700 text-white text-center px-2 py-2 flex flex-col justify-center items-center tracking-tighter leading-tight cursor-pointer"
						onClick={handleImageIndex}
					>
						Make Primary
					</div>
				)}
			</div>
		</div>
	);
};

const ImageEditField = ({
	source,
	label,
	resource,
	fullWidth = false,
}: ImageEditFieldProps) => {
	const { record: _record } = useEditContext();
	console.log("record: ", _record);

	return (
		<Fragment>
			<WithRecord
				label="author"
				render={(record) => {
					return (
						<div className="w-full flex flex-col justify-center items-center gap-2">
							<div
								className={clsx(
									"w-full gap-2",
									record?.images?.length >= 1 ? "grid" : "flex"
								)}
								style={{
									gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
									placeItems: "center",
								}}
							>
								{Boolean(
									record?.images?.length && record.images?.length >= 1
								) &&
									record.images.map(
										(
											img: { publicUrl: string; path: string },
											index: number
										) => {
											if (img?.publicUrl) {
												return (
													<ImageWrapper
														filename={img?.publicUrl}
														record={_record}
														label={label}
														resource={resource}
														_index={index}
														path={img.path}
													/>
												);
											}
										}
									)}
							</div>
							<div>
								<ImageInput
									source={source}
									label={false}
									accept={[".jpeg", ".jpg", ".png"]}
									multiple={true}
									name="image"
									fullWidth={fullWidth}
								>
									<ImageField source="src" title="filename" />
								</ImageInput>
							</div>
						</div>
					);
				}}
			/>
		</Fragment>
	);
};

export default ImageEditField;

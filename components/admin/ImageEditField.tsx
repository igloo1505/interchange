import {
	ImageInput,
	ImageField,
	useShowContext,
	WithRecord,
	useEditContext,
	useRefresh,
} from "react-admin";
import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { HiOutlineXMark } from "react-icons/hi2";
import { VolunteerInterface } from "../../models/Volunteer";
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
		<div className="flex flex-col justify-center items-center">
			<div className="w-[150px] h-[150px] relative editImageContainer flex justify-start items-start flex-col">
				<Image
					src={filename}
					alt={"Person"}
					fill
					className="z-50 object-contain"
				/>
			</div>
			<div className="grid grid-cols-2 w-full gap-3">
				<div
					className="bg-red-700 text-white text-center px-3 py-2 cursor-pointer"
					onClick={handleClearImage}
				>
					Delete
				</div>
				<div
					className="bg-blue-700 text-white text-center px-3 py-2 cursor-pointer"
					onClick={handleImageIndex}
				>
					Make Primary
				</div>
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
									"w-full",
									record?.images?.length >= 1 ? "grid" : "flex"
								)}
								style={{
									gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
									placeItems: "center",
								}}
							>
								{record?.images?.length &&
									record.images?.length >= 1 &&
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

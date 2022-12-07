import {
	ImageInput,
	ImageField,
	useShowContext,
	WithRecord,
	useEditContext,
	useRefresh
} from "react-admin";
import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { HiOutlineXMark } from "react-icons/hi2";
import { VolunteerInterface } from "../../models/Volunteer";
import {clearImage} from '../../utils/clearImage';
interface ImageEditFieldProps {
	source: string;
	label: string;
	resource: string;
}

const ImageEditField = ({ source, label, resource }: ImageEditFieldProps) => {
	const { record: _record } = useEditContext();
	const refresh = useRefresh()
	const handleClearImage = async () => {
		let _data = {
			id: _record.id,
			data: { image: false },
			previousData: _record,
		};
		console.log(JSON.stringify(_data, null, 2));
		let res = await clearImage({id: _record.id, resource: resource})
		if(res.data.success){
			refresh()
		}
	};

	return (
		<Fragment>
			<WithRecord
				label="author"
				render={(record) => {
					return (
						<div>
							{record.image ? (
								<div className="w-[200px] h-[200px] object-contain relative editImageContainer">
									<Image
										src={`/uploads/${record.image}`}
										alt={"Person"}
										fill
										className="z-50"
									/>
									<div className="h-100% w-100% z-[1000] absolute">
										<HiOutlineXMark
											className="relative cursor-pointer"
											style={{ zIndex: 1000 }}
											onClick={handleClearImage}
										/>
									</div>
								</div>
							) : (
								<ImageInput
									source={source}
									label={label}
									accept={[".jpeg", ".jpg", ".png"]}
									multiple={false}
									name="image"
								>
									<ImageField source="src" title="filename" />
								</ImageInput>
							)}
						</div>
					);
				}}
			/>
		</Fragment>
	);
};

export default ImageEditField;

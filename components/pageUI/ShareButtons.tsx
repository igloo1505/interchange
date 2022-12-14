import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import { BsTwitter } from "react-icons/bs";
import { socialInfo } from "../../utils/infoDetails";
import * as Icons from "./Icons";
import {
	EmailShareButton,
	FacebookShareButton,
	FacebookMessengerShareButton,
	InstapaperShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	PocketShareButton,
	TwitterShareButton,
} from "react-share";
import { useRouter } from "next/router";
import clsx from "clsx";
interface ShareButtonsProps {
	quote: string;
	hashtag?: string;
	title: string;
	description: string;
	subject?: string;
	url: string;
}

const Button = ({
	children,
	class_name,
}: {
	children: JSX.Element;
	class_name: string;
}) => {
	return (
		<div
			className={clsx(
				"share-icon bg-primary-800 border-primary-500",
				class_name
			)}
		>
			{children}
		</div>
	);
};

const ShareButtons = ({
	quote,
	hashtag,
	title,
	description,
	subject = "From the Interchange Food Pantry",
}: ShareButtonsProps) => {
	const router = useRouter();
	let url = `${window?.location.origin}${router.asPath}`;
	return (
		<div className="flex flex-row justify-end items-center gap-2">
			<EmailShareButton url={url} subject={title}>
				<Button class_name="email">
					<MailIcon className="fill-primary-500 m-3 h-8 w-8" />
				</Button>
			</EmailShareButton>
			<TwitterShareButton
				url={url}
				title={title}
				hashtags={["interchangeFP"]}
				related={socialInfo.twitter.related}
			>
				<Button class_name="twitter">
					<BsTwitter className="fill-primary-500 m-3 h-8 w-8" />
				</Button>
			</TwitterShareButton>
			<PocketShareButton url={url} title={title}>
				<Button class_name="pocket">
					<Icons.Pocket />
				</Button>
			</PocketShareButton>
			<InstapaperShareButton url={url} title={title}>
				<Button class_name="instagram">
					<Icons.Instagram />
				</Button>
			</InstapaperShareButton>
		</div>
	);
};

export default ShareButtons;

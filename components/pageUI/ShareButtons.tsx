import React, { MouseEvent, MouseEventHandler } from "react";
import MailIcon from "@mui/icons-material/Mail";
import { BsTwitter } from "react-icons/bs";
import { socialInfo } from "../../utils/infoDetails";
import * as Icons from "./Icons";
import {
	hoverAnimationEnter,
	hoverAnimationExit,
	hoverAnimationMove,
} from "../../animations/hoverShareButton";
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
	let _id = `share-button-${class_name}`;
	return (
		<div
			className={clsx(
				"share-icon bg-primary-800 border-primary-500 will-change-auto cursor-pointer",
				class_name
			)}
			id={_id}
			onMouseEnter={hoverAnimationEnter}
			onMouseLeave={hoverAnimationExit}
			// onMouseMove={hoverAnimationMove}
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
		<div
			className="flex flex-row justify-end items-center gap-2 mb-3"
			onMouseMove={(e) =>
				hoverAnimationMove(e, ["email", "twitter", "pocket", "instagram"])
			}
		>
			<Button class_name="email">
				<EmailShareButton url={url} subject={title}>
					<MailIcon className="fill-primary-500 m-3 h-8 w-8" />
				</EmailShareButton>
			</Button>
			<Button class_name="twitter">
				<TwitterShareButton
					url={url}
					title={title}
					hashtags={["interchangeFP"]}
					related={socialInfo.twitter.related}
				>
					<BsTwitter className="fill-primary-500 m-3 h-8 w-8" />
				</TwitterShareButton>
			</Button>
			<Button class_name="pocket">
				<PocketShareButton url={url} title={title}>
					<Icons.Pocket />
				</PocketShareButton>
			</Button>
			<Button class_name="instagram">
				<InstapaperShareButton url={url} title={title}>
					<Icons.Instagram />
				</InstapaperShareButton>
			</Button>
		</div>
	);
};

export default ShareButtons;

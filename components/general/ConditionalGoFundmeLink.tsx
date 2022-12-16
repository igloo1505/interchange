import React, { Fragment } from "react";
import { socialInfo } from "../../utils/infoDetails";
interface ConditionalGoFundMeProps {
	text: string;
	activeClasses?: string;
	inactiveClasses?: string;
}

const ConditionalGoFundMeLink = ({
	text,
	activeClasses = "text-primary-600",
	inactiveClasses = "",
}: ConditionalGoFundMeProps) => {
	return (
		<Fragment>
			{socialInfo.goFundMeURL ? (
				<a href={socialInfo.goFundMeURL} className={activeClasses}>
					{text}
				</a>
			) : (
				<span className={inactiveClasses}>{text}</span>
			)}
		</Fragment>
	);
};

export default ConditionalGoFundMeLink;

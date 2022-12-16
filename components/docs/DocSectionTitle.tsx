import React from "react";

interface DocSectionTitleProps {
	title: string;
	id: string;
}

const DocSectionTitle = ({ title, id }: DocSectionTitleProps) => {
	return (
		<div className="text-2xl text-primary-700" id={`doc-section-title-${id}`}>
			{title}
		</div>
	);
};

export default DocSectionTitle;

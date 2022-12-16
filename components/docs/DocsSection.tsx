import React from "react";
import { section } from "./docsData";
import DocSectionTitle from "./DocSectionTitle";
import DocsSubSectionAccordian from "./DocsSubSectionAccordian";

interface DocsSectionProps {
	section: section;
}

const DocsSection = ({ section }: DocsSectionProps) => {
	return (
		<div className="w-screen px-5 py-5">
			<DocSectionTitle title={section.title} id={section.id} />
			{section.content && <div>{section.content}</div>}
			{section.subSections &&
				section.subSections?.length >= 1 &&
				section.subSections?.map((s) => {
					return <DocsSubSectionAccordian subSection={s} />;
				})}
		</div>
	);
};

export default DocsSection;

import React from "react";
import { sections } from "../../components/docs/docsData";
import DocsSection from "../../components/docs/DocsSection";
import Image from "next/image";
import IFPLogo from "../../public/assets/IFP-logo.png";
import Link from "next/link";

interface DocsProps {}

const Docs = ({}: DocsProps) => {
	return (
		<div className="w-screen flex flex-col justify-center items-center py-3">
			<Link href="/">
				<Image
					src={IFPLogo}
					alt="Interchange Food Pantry Logo"
					width={80}
					height={80}
				/>
			</Link>
			{sections.map((s, i) => {
				return <DocsSection section={s} key={`doc-section-${i}`} />;
			})}
		</div>
	);
};

export default Docs;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";

const connector = connect((state: RootState, props) => ({
	isOpen: state.UI.drawer.columnRightOpen,
}));
interface LockBodyListenerProps {
	isOpen: boolean;
}

const LockBodyListener = connector(({ isOpen }: LockBodyListenerProps) => {
	const [originalBodyStyle, setOriginalBodyStyle] = useState<string | null>(
		null
	);
	useEffect(() => {
		const originalStyle: string = window.getComputedStyle(
			document.body
		).overflow;
		if (originalStyle !== "hidden") {
			setOriginalBodyStyle(originalStyle);
		}
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		if (!isOpen) {
			document.body.style.overflow = originalBodyStyle || originalStyle;
		}
	}, [isOpen]);
	return (
		<div
			className="scale-0"
			style={{
				display: isOpen ? "flex" : "hidden",
			}}
		></div>
	);
});

export default LockBodyListener;

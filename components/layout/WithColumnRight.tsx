import React, { useEffect, useState } from "react";
import ColumnRight from "./ColumnRight";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";

interface WithColumnRightProps {
	children: JSX.Element | JSX.Element[] | string;
	dimensions: typeof initialState.UI.dimensions;
	columnRightAnimationDelay?: number | undefined | null;
	isOpen: boolean | null;
}

const connector = connect((state: RootState, props: any) => ({
	dimensions: state.UI.dimensions,
	isOpen: state.UI.drawer.columnRightOpen,
	props: props,
}));

const WithColumnRight = connector(
	({
		children,
		dimensions,
		isOpen,
		columnRightAnimationDelay,
	}: WithColumnRightProps) => {
		const [size, setSizes] = useState({
			open: "10vw 1fr",
			closed: "1fr min(200px, 20vw)",
		});
		useEffect(() => {
			if (!dimensions.viewport) return;
			let leftOpen =
				dimensions.viewport.width > 600
					? dimensions.viewport.width * 0.1
					: dimensions.viewport.width - 32;
			let rightClosed =
				dimensions.viewport.width < 980 ? dimensions.viewport.width * 0.2 : 200;
			setSizes({
				open: `${leftOpen}px ${dimensions.viewport.width - leftOpen}px`,
				closed: `${dimensions.viewport.width - rightClosed}px ${rightClosed}px`,
			});
		}, [dimensions]);
		return (
			<div
				className="grid w-full h-full transition-all duration-700 will-change-auto"
				style={{
					gridTemplateColumns: isOpen ? size.open : size.closed,
				}}
			>
				<div className="w-full h-full">{children}</div>
				<ColumnRight
					dimensions={dimensions}
					animationDelay={columnRightAnimationDelay}
				/>
			</div>
		);
	}
);

export default WithColumnRight;

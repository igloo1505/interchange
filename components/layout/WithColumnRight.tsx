import React from "react";
import ColumnRight from "./ColumnRight";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";

interface WithColumnRightProps {
	children: JSX.Element | JSX.Element[] | string;
	dimensions: typeof initialState.UI.dimensions;
	columnRightAnimationDelay?: number | undefined | null;
}

const connector = connect((state: RootState, props: any) => ({
	dimensions: state.UI.dimensions,
	props: props,
}));

const WithColumnRight = connector(
	({
		children,
		dimensions,
		columnRightAnimationDelay,
	}: WithColumnRightProps) => {
		console.log("dimensions: ", dimensions);
		return (
			<div
				className="grid w-full h-full"
				style={{
					gridTemplateColumns: "1fr min(200px, 20vw)",
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

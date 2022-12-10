import React, { useEffect, useState } from "react";
import ColumnRight from "./ColumnRight";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import clsx from "clsx";
import { useRouter } from "next/router";

interface WithColumnRightProps {
	children: JSX.Element | JSX.Element[] | string;
	dimensions: typeof initialState.UI.dimensions;
	columnRightAnimationDelay?: number | undefined | null;
	isOpen: boolean | null;
	scrollbar: number;
	hideColumnRight: boolean;
}

const connector = connect((state: RootState, props: any) => ({
	dimensions: state.UI.dimensions,
	isOpen: state.UI.drawer.columnRightOpen,
	props: props,
	scrollbar: state.UI.dimensions.scrollbar,
	hideColumnRight: state.UI.drawer.hideColumnRight,
}));

const WithColumnRight = connector(
	({
		children,
		dimensions,
		isOpen,
		columnRightAnimationDelay,
		scrollbar,
		hideColumnRight,
	}: WithColumnRightProps) => {
		const router = useRouter();
		const [size, setSizes] = useState({
			open: "10vw 1fr",
			closed: "1fr 200px",
		});
		useEffect(() => {
			if (!dimensions.viewport) return;
			let leftOpen =
				dimensions.viewport.width > 600
					? dimensions.viewport.width * 0.1
					: dimensions.viewport.width - 32;
			let rightClosed = 200;
			setSizes({
				open: `${leftOpen}px ${dimensions.viewport.width - leftOpen - 16}px`,
				closed: `${
					dimensions.viewport.width - rightClosed - 16
				}px ${rightClosed}px`,
			});
		}, [dimensions]);
		return (
			<div
				className="justify-between transition-all duration-700 will-change-auto"
				style={{
					gridTemplateColumns: hideColumnRight
						? "1fr"
						: isOpen
						? size.open
						: size.closed,
					height: isOpen
						? `calc(100vh - ${dimensions.navbar.height + 16}px)`
						: "calc(100% - 1rem)",
					// height: `calc(100vh - ${dimensions.navbar.height + 16}px)`,
					// overflowY: isOpen ? "hidden" : "auto",
					overflowY: isOpen ? "hidden" : "auto",
					overflowX: "hidden",
					// width: `calc(100vw - ${scrollbar ? scrollbar : 16}px)`,
					width: `100vw`,
					display:
						dimensions.viewport.width < 768 || hideColumnRight
							? "flex"
							: "grid",
				}}
			>
				<div
					className={clsx(
						"w-full h-full columnLeft",
						isOpen && "columnLeftOpen"
					)}
				>
					{children}
				</div>
				{dimensions.viewport.width >= 768 &&
					!hideColumnRight &&
					router.asPath !== "/HoursAndLocation" && (
						<ColumnRight
							dimensions={dimensions}
							animationDelay={columnRightAnimationDelay}
						/>
					)}
			</div>
		);
	}
);

export default WithColumnRight;

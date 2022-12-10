import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { connect } from "react-redux";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { RootState } from "../../state/store";
import { toggleColumnRight } from "../../state/actions";
import initialState from "../../state/initialState";
import clsx from "clsx";

const connector = connect((state: RootState, props: any) => ({
	columnRight: state.UI.dimensions.columnRight.width,
	navbar: state.UI.dimensions.navbar.height,
	viewport: state.UI.dimensions.viewport,
	isOpen: state.UI.drawer.columnRightOpen,
	scrollbar: state.UI.dimensions.scrollbar,
}));
interface MapProps {
	columnRight: number | undefined;
	navbar: number;
	isOpen: boolean;
	viewport: typeof initialState.UI.dimensions.viewport;
	scrollbar: number;
}

const Map = connector(
	({ columnRight, isOpen, navbar, viewport, scrollbar }: MapProps) => {
		const dispatch = useAppDispatch();
		let leftOpen =
			viewport.width > 600 ? viewport.width * 0.1 : viewport.width - 32;
		const [sizes, setSizes] = useState({
			closed: {
				width: `${
					columnRight
						? scrollbar || Boolean(window && window.scrollbars)
							? columnRight - 24
							: columnRight - 16
						: 200
				}px`,
				height: `${columnRight ? columnRight - 16 : 200}px`,
			},
			open: {
				width: `${
					columnRight ? Math.floor(viewport.width - leftOpen - 32) : 200
				}px`,
				height: `${navbar && viewport ? viewport.height - navbar - 32 : 200}px`,
			},
		});
		const [currentSize, setCurrentSize] = useState(sizes.closed);

		useEffect(() => {
			setCurrentSize(isOpen ? sizes.open : sizes.closed);
		}, [isOpen]);

		useEffect(() => {
			let leftOpen =
				viewport.width > 600 ? viewport.width * 0.1 : viewport.width - 32;
			setSizes({
				...sizes,
				closed: {
					...sizes.closed,
				},
				open: {
					...sizes.open,
					width: `${
						columnRight ? Math.floor(viewport.width - leftOpen - 32) : 200
					}px`,
					height: `${
						navbar && viewport ? viewport.height - navbar - 32 : 200
					}px`,
				},
			});
			console.log("isOpen: ", isOpen);
			console.log("navbar: ", sizes);
		}, [columnRight, navbar]);
		const toggleFullWidth = () => {
			if (isOpen) return;
			dispatch(toggleColumnRight());
		};
		return (
			<div
				style={{
					width: isOpen ? "calc(100% - 1.5rem)" : "calc(100% - 1rem)",
					maxWidth: isOpen ? "calc(100% - 1.5rem)" : "calc(100% - 1rem)",
					height: isOpen ? sizes.open.height : sizes.closed.height,
				}}
				// style={{
				// 	width: "calc(100% - 1rem)",
				// 	height: "200px",
				// }}
				className={clsx(
					"relative grid my-2 overflow-hidden transition-all duration-700 place-items-center cursor-pointer",
					isOpen && "mapContainerOuterOpen"
				)}
				onClick={toggleFullWidth}
			>
				<MapContainer
					center={[43.0459852, -87.9121041]}
					zoom={15}
					scrollWheelZoom={true}
					doubleClickZoom={true}
					className={clsx(
						"absolute will-change-auto mapContainer cursor-pointer"
					)}
					style={sizes.open}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[43.0459852, -87.9121041]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		);
	}
);

export default Map;

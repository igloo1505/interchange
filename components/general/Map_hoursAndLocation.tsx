import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import clsx from "clsx";
import info from "../../utils/infoDetails";

interface Map_hoursAndLocationProps {}
const Map_hoursAndLocation = ({}: Map_hoursAndLocationProps) => {
	return (
		<div className="relative w-[90%] sm:w-[80%] md:w-full h-[300px] sm:h-[400px]">
			<MapContainer
				center={[43.0459852, -87.9121041]}
				zoom={15}
				scrollWheelZoom={false}
				className={clsx("absolute will-change-auto h-full w-full")}
				style={{}}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[43.0459852, -87.9121041]}>
					<Popup>
						130 E. Juneau Ave. <br />{" "}
						<a href={info.mapsHref} target="_blank">
							Open in Google Maps
						</a>
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map_hoursAndLocation;

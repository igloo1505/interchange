import { Html, Head, Main, NextScript } from "next/document";

// Might need to add this back in
{
	/* <script
src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
crossOrigin=""
></script> */
}

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
					integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
					crossOrigin=""
				/>
				<script
					src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
					integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
					crossOrigin=""
				></script>{" "}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

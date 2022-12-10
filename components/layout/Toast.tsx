import React, { useEffect, useState } from "react";
import ToastConfig from "../../types/ToastConfig";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import { BiX } from "react-icons/bi";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { hideToast } from "../../state/actions";

const connector = connect((state: RootState, props: any) => ({
	config: state.toast,
	props: props,
}));

interface ToastProps {
	config: ToastConfig;
}

const Toast = ({ config }: ToastProps) => {
	const [isShown, setIsShown] = useState(false);
	const [cancelID, setCancelId] = useState<string | any>(null);
	const dispatch = useAppDispatch();
	const __timeout = config.delay || 3000;

	const closeToast = (withTimeout: boolean) => {
		// if (!isShown) return;
		if (cancelID) {
			clearTimeout(cancelID);
			// dispatch(hideToast());
			// setCancelId(null);
		}
		let cancelId = setTimeout(
			() => {
				setIsShown(false);
				if (typeof window === "undefined") {
					return;
				}
				setTimeout(() => {
					dispatch(hideToast());
					setCancelId(null);
				}, 300);
			},
			withTimeout ? __timeout : 0
		);
		setCancelId(cancelId);
	};
	useEffect(() => {
		if (isShown) return;
		if (config.message && config.message !== "" && !isShown && !cancelID) {
			if (typeof window === "undefined") {
				return;
			}
			document
				.getElementById("main-toast-container")
				?.classList.add(`bg-toast_${config.type}`);
			setIsShown(true);
			closeToast(true);
		}
	}, [config]);

	return (
		<div
			className={clsx(
				`w-max fixed top-[8px] left-[50%] z-[900] grid gap-2 py-3 px-3 bg-primary-700 toast-container rounded toast-container-${config.type}`,
				isShown ? "toastShow" : "toastHide"
			)}
			id="main-toast-container"
		>
			<div className="text-white">{config.message}</div>
			{config.message && (
				<BiX
					className="w-6 h-6 cursor-pointer fill-white right-2 toastIcon"
					onClick={() => closeToast(false)}
				/>
			)}
		</div>
	);
};

export default connector(Toast);

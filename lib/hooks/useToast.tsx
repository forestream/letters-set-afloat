import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ANIMATE_DUR } from "../constants/global";

interface ToastProps {
	className: string;
}

export default function useToast(
	duration: number
): [(props: PropsWithChildren<ToastProps>) => JSX.Element, () => void] {
	const ref = useRef<HTMLDivElement>(null);
	const [toastUp, setToastUp] = useState(false);

	const showToast = () => {
		setToastUp(true);

		setTimeout(() => {
			setToastUp(false);
		}, duration);
	};

	useEffect(() => {
		setTimeout(() => {
			if (!ref.current) return;
			ref.current.style.transform = "translateY(0%)";
			ref.current.style.opacity = "1";
		}, 0);

		setTimeout(() => {
			if (!ref.current) return;
			ref.current.style.transform = "translateY(100%)";
			ref.current.style.opacity = "0";
		}, duration - ANIMATE_DUR);
	}, [toastUp, duration]);

	const Toast = ({ children, className }: PropsWithChildren<ToastProps>) => (
		<>
			{toastUp && (
				<div
					className={className}
					ref={ref}
					style={{
						transition: `transform ${ANIMATE_DUR}ms ease-in-out, opacity ${ANIMATE_DUR}ms ease-in-out`,
						transform: "translateY(100%)",
						opacity: "0",
					}}
				>
					{children}
				</div>
			)}
		</>
	);

	return [Toast, showToast];
}

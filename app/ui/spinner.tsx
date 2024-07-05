import clsx from "clsx";
import styles from "./spinner.module.css";

interface SpinnerProps {
	color?: "white" | "gray";
}

export default function Spinner({ color = "gray" }: SpinnerProps) {
	return (
		<div
			className={clsx(styles.spinner, { [styles[color]]: color === "white" })}
		></div>
	);
}

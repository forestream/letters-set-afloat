import React, { PropsWithChildren } from "react";
import Background from "./background";
import styles from "./layout.module.css";

interface LayoutProps {
	letterModal: React.ReactNode;
}

export default function Layout({
	children,
	letterModal,
}: PropsWithChildren<LayoutProps>) {
	return (
		<main className={styles.main}>
			<Background />
			{children}
			{letterModal}
		</main>
	);
}

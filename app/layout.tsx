import styles from "./layout.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "띄워 보낸 편지",
	description: "부칠 수 없어 띄워 보낸 편지. Letters set afloat.",
};

export default function RootLayout({
	children,
	contactModal,
}: Readonly<{
	children: React.ReactNode;
	contactModal: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={inter.className}>
				{children}
				{contactModal}
				<div className={styles.footer}>
					<Link href="/contact" className={styles.contact}>
						문의
					</Link>
				</div>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Script from "next/script";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
			{/* <!-- Google tag (gtag.js) --> */}
			<Script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-X7LXFG3H2K"
			></Script>
			<Script id="google-tag" strategy="afterInteractive">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-X7LXFG3H2K');
				`}
			</Script>
			<body className={inter.className}>
				<main className="h-screen bg-black relative">
					<Header />
					{children}
					{contactModal}
					<Footer />
				</main>
			</body>
		</html>
	);
}

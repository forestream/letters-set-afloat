"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigateButton() {
	const pathname = usePathname();

	const href = pathname === "/" ? "/fish-out" : "/";
	const buttonText = pathname === "/" ? "떠밀려 온 편지" : "띄워 보낸 편지";

	return (
		<Link
			href={href}
			className="relative text-white no-underline font-bold p-3 rounded-lg transition-colors hover:bg-button-hover"
		>
			{buttonText}
		</Link>
	);
}

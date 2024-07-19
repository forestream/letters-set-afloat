import Link from "next/link";
import Login from "./login";

export default function Header() {
	return (
		<header className="absolute top-0 right-0 left-0 z-10 flex justify-end items-center gap-4 p-4">
			<Link
				href="/fish-out"
				className="relative text-amber-200 no-underline font-bold p-3 rounded-lg transition-colors hover:bg-button-hover"
			>
				떠밀려 온 편지
			</Link>
			<Login className="relative text-amber-200 no-underline font-bold p-3 rounded-lg transition-colors hover:bg-button-hover has-[li:hover]:bg-transparent" />
		</header>
	);
}

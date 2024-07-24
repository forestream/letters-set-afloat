import Login from "./login";
import NavigateButton from "./navigate-button";

export default function Header() {
	return (
		<header className="absolute top-0 right-0 left-0 z-10 flex justify-end items-center gap-4 p-4 h-20">
			<NavigateButton />
			<div className="w-16 flex justify-end">
				<Login className="relative text-white no-underline font-bold p-3 rounded-lg transition-colors hover:bg-button-hover has-[li:hover]:bg-transparent" />
			</div>
		</header>
	);
}

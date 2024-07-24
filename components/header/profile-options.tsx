import { auth } from "@/lib/firebase/firebase";
import { MouseEventHandler, useEffect, useRef } from "react";

interface ProfileOptionsProps {
	onCloseOption: () => void;
}

export default function ProfileOptions({ onCloseOption }: ProfileOptionsProps) {
	const ref = useRef<HTMLUListElement>(null);

	const handleLogout: MouseEventHandler = async (event) => {
		event.stopPropagation();
		auth.signOut();
	};

	useEffect(() => {
		const handleClickOutside: MouseEventHandler = (event) => {
			if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
				event.stopPropagation();
				onCloseOption();
			}
		};

		document.body.addEventListener(
			"click",
			handleClickOutside as unknown as EventListener
		);

		return () =>
			document.body.removeEventListener(
				"click",
				handleClickOutside as unknown as EventListener
			);
	}, [onCloseOption]);

	return (
		<ul
			ref={ref}
			className="absolute -bottom-2 right-0 translate-y-full w-max bg-white rounded text-black font-normal p-1"
		>
			<li
				onClick={handleLogout}
				className="hover:bg-neutral-100 px-3 py-1 rounded"
			>
				로그아웃
			</li>
		</ul>
	);
}

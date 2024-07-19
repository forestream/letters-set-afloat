import { removeUser } from "@/app/actions";
import { User } from "@/app/actions.type";
import { MouseEvent, MouseEventHandler, useEffect, useRef } from "react";

interface ProfileOptionsProps {
	onUser: (value: User | null) => void;
	onCloseOption: () => void;
}

export default function ProfileOptions({
	onUser,
	onCloseOption,
}: ProfileOptionsProps) {
	const ref = useRef<HTMLUListElement>(null);

	const handleLogout = async () => {
		await removeUser();
		onUser(null);
	};

	useEffect(() => {
		const handleClickOutside: MouseEventHandler = (event) => {
			if (ref.current && !(event.target as HTMLElement).contains(ref.current))
				onCloseOption();
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
		<ul ref={ref} className="absolute bottom-0 right-0 translate-y-full w-max">
			<li
				onClick={handleLogout}
				className="hover:bg-button-hover px-4 py-2 rounded"
			>
				로그아웃
			</li>
		</ul>
	);
}

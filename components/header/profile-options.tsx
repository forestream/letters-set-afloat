import { removeUser } from "@/app/actions";
import { User } from "@/app/actions.type";

interface ProfileOptionsProps {
	handleUser: (value: User | null) => void;
}

export default function ProfileOptions({ handleUser }: ProfileOptionsProps) {
	const handleLogout = async () => {
		await removeUser();
		handleUser(null);
	};

	return (
		<ul className="absolute bottom-0 right-0 translate-y-full w-max">
			<li
				onClick={handleLogout}
				className="hover:bg-button-hover px-4 py-2 rounded"
			>
				로그아웃
			</li>
		</ul>
	);
}

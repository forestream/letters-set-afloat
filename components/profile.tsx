import { User } from "@/app/actions.type";
import Image from "next/image";

interface ProfileProps {
	user: User;
}

export default function Profile({ user }: ProfileProps) {
	return (
		<>
			<div className="w-8 h-8 rounded-full relative bg-neutral-100 flex items-center justify-center">
				{user.profileImage ? (
					<Image
						src={user.profileImage}
						alt="사용자 프로필"
						fill
						className="rounded-full"
					/>
				) : (
					<span className="text-xl font-normal text-black">
						{user.displayName && user.displayName[0]}
					</span>
				)}
			</div>
			<ul className="absolute bottom-0 right-0 translate-y-full w-max">
				<li className="hover:bg-button-hover px-4 py-2 rounded">로그아웃</li>
			</ul>
		</>
	);
}

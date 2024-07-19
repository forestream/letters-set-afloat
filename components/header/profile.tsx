import { User } from "@/app/actions.type";
import Image from "next/image";
import ProfileOptions from "./profile-options";
import { useState } from "react";

interface ProfileProps {
	user: User;
	handleUser: (value: User | null) => void;
}

export default function Profile({ user, handleUser }: ProfileProps) {
	return (
		<>
			<div className="w-7 h-7 rounded-full relative bg-neutral-100 flex items-center justify-center">
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
			{true && <ProfileOptions handleUser={handleUser} />}
		</>
	);
}

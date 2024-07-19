"use client";

import { getUser, loginOnServer } from "@/app/actions";
import { User } from "@/app/actions.type";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import Profile from "./profile";

declare global {
	var google: any;
}

interface LoginProps {
	className: string;
}

export default function Login({ className }: LoginProps) {
	const [user, setUser] = useState<User | null>(null);

	const handleCredentialResponse = (response: any) => {
		loginOnServer(response.credential);
	};

	const handleLogin = () => {
		google.accounts.id.initialize({
			client_id:
				"713412924199-gprgb7jbbojjct6jjka8ah2hmu648kv4.apps.googleusercontent.com",
			callback: handleCredentialResponse,
		});
		google.accounts.id.prompt(); // also display the One Tap dialog
	};

	const getUserAsync = async () => {
		const user = await getUser();
		setUser(user);
	};

	useEffect(() => {
		getUserAsync();
	}, []);

	console.log(user);

	return (
		<>
			<Script src="https://accounts.google.com/gsi/client" />
			{user ? (
				<button className={className}>
					<Profile user={user} />
				</button>
			) : (
				<button onClick={handleLogin} className={className}>
					구글 로그인
				</button>
			)}
		</>
	);
}

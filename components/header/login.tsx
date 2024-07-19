"use client";

import { getUser, loginOnServer } from "@/app/actions";
import { User } from "@/app/actions.type";
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

	const getUserAsync = async () => {
		const user = await getUser();
		setUser(user);
	};

	const handleCredentialResponse = async (response: any) => {
		const result = await loginOnServer(response.credential);
		setUser(result.data);
	};

	const handleLogin = () => {
		google.accounts.id.initialize({
			client_id:
				"713412924199-gprgb7jbbojjct6jjka8ah2hmu648kv4.apps.googleusercontent.com",
			callback: handleCredentialResponse,
		});
		google.accounts.id.prompt(); // also display the One Tap dialog
	};

	useEffect(() => {
		getUserAsync();
	}, []);

	const handleUser = (value: User | null) => setUser(value);

	return (
		<>
			<Script src="https://accounts.google.com/gsi/client" />
			{user ? (
				<Profile user={user} handleUser={handleUser} className={className} />
			) : (
				<button onClick={handleLogin} className={className}>
					구글 로그인
				</button>
			)}
		</>
	);
}

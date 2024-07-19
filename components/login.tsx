"use client";

import { loginOnServer } from "@/app/actions";
import Script from "next/script";

declare global {
	var google: any;
}

interface LoginProps {
	className: string;
}

export default function Login({ className }: LoginProps) {
	const handleCredentialResponse = (response: any) => {
		console.log(response);
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

	return (
		<>
			<Script src="https://accounts.google.com/gsi/client" />
			<button onClick={handleLogin} className={className}>
				구글 로그인
			</button>
		</>
	);
}

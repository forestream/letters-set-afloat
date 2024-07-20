"use client";

import { getUser } from "@/app/actions";
import { User } from "@/app/actions.type";
import { useEffect, useState } from "react";
import Profile from "./profile";

declare global {
	var google: any;
	var gapi: any;
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

	const handleCredentialResponse = (result: any) => {
		console.log(result);
	};

	useEffect(() => {
		const oneTapLogin = () => {
			google.accounts.id.initialize({
				client_id:
					"713412924199-gprgb7jbbojjct6jjka8ah2hmu648kv4.apps.googleusercontent.com",
				callback: handleCredentialResponse,
				ux_mode: "redirect",
			});
			google.accounts.id.prompt();
		};

		oneTapLogin();
		getUserAsync();

		google.accounts.id.renderButton(document.getElementById("gsi-button"), {
			type: "icon",
			shape: "circle",
		});
	}, []);

	const handleUser = (value: User | null) => setUser(value);

	return (
		<>
			{user ? (
				<Profile user={user} handleUser={handleUser} className={className} />
			) : (
				<button id="gsi-button" className={className}></button>
			)}
		</>
	);
}

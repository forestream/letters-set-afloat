import { Letter } from "./main.type";

export async function postLetter(data: Letter) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/letters`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
}

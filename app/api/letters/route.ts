import { db } from "@/lib/firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		await addDoc(collection(db, "letters"), {
			sentAt: Timestamp.now(),
			letter: body.letter,
		});

		return new Response(null, {
			status: 201,
			statusText: "Created",
		});
	} catch (error: any) {
		return new Response("Error adding document: " + error, {
			status: 400,
			statusText: "Bad Request",
		});
	}
}

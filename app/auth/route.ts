export async function POST(request: Request) {
	const formData = await request.formData();
	const credential = formData.get("credential");

	return Response.json(
		{},
		{
			status: 303,
			headers: { Location: "/auth/signin", "Set-Cookie": `gc=${credential}` },
		}
	);
}

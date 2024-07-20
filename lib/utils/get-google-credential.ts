export default function getGoogleCredential() {
	const cookies = document.cookie.split("; ");
	const gcCookie = cookies.find((cookie) => cookie.startsWith("gc=")) || "";
	const gc = gcCookie.slice(3);

	return gc;
}

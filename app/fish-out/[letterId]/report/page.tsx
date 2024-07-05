import { redirect } from "next/navigation";

interface PageProps {
	params: { [key: string]: string };
}

export default async function Page({ params }: PageProps) {
	redirect(`/fish-out/${params.letterId}`);
}

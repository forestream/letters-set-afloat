export interface Letter {
	id: string;
	letter: string;
	sentAt: string;
}

export interface State {
	success: boolean;
	error: string | null;
}

export interface FrontUser {
	email: string | null;
	uid: string;
	displayName: string | null;
	photoURL: string | null;
}

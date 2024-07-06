export interface Letter {
	id: string;
	letter: string;
	sentAt: string;
}

export interface State {
	success: boolean;
	error: string | null;
}

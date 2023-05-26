interface Message {
	id: number;
	body?: string;
	image?: string;
	seen: User[];
	sender: User;
}

interface User {
	id: number;
	name: string;
	isOnline: boolean;
	lastOnline: string;
}

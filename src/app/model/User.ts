import { Stats } from "./Stats";

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
	nome: string;
	cognome: string;
    isBanned: boolean;
    userImage: string;
    stats: Stats;
}
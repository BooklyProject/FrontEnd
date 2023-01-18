import { Volume } from "../GoogleBooks/models/volume.interface";

export interface User {
    id: BigInt;
    email: string;
    username: string;
    password: string;
	nome: string;
	cognome: string;
    provider: number;
    isBanned: boolean;
    userImage: string;
}

export interface Recensione{
    id: BigInt;
    titolo: string;
    testo: string;
    numeroMiPiace: number;
    numeroNonMiPiace: number;
    scrittaDa: User;
    libro: Volume;
}
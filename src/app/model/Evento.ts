import { User } from "./User";

export interface Evento{
    id: BigInt;
    nome: string;
    descrizione: string;
    data: Date;
    ora: Date;
    luogo: number;
    partecipanti: number;
    utente: User;
}
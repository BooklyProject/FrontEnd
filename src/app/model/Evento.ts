import { User } from "./User";

export interface Evento{
    id: BigInt;
    nome: string;
    descrizione: string;
    data: number;
    luogo: number;
    partecipanti: number;
    utente: User;
}
export interface Segnalazione{
    id: number;
    tipo: string;
    idPost: number;
    idUtente: number;
    username: string;
    idAmministratore: number;
    descrizione: string;
    isDone: boolean;
}
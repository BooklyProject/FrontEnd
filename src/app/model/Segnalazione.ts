export interface Segnalazione{
    id: number;
    tipo: string;
    idPost: number;
    idUtente: number;
    idAmministratore: number;
    descrizione: string;
    isDone: boolean;
}
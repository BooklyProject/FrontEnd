
export interface Recensione {
    id: number;
    descrizione: string;
    voto: number;
    numMiPiace: number;
    numNonMiPiace: number;
    commenti: Commento[];
    userId: number,
    username: string,
    userImg: string
}

export interface Commento {
    id: number;
    descrizione: string;
    numMiPiace: number;
    numNonMiPiace: number;
}
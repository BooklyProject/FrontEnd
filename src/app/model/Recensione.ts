
export interface Recensione {
    id: Number;
    descrizione: string;
    voto: number;
    numMiPiace: number;
    numNonMiPiace: number;
    commenti: Commento[];
    userId: number,
    username: string,
    userImg: string,
    showComments: boolean
}

export interface Commento {
    id: Number;
    descrizione: string;
    numMiPiace: number;
    numNonMiPiace: number;
    userId: number,
    username: string,
    userImg: string
}

export interface Recensione {
    id: Number;
    descrizione: string;
    voto: number;
    numeroMiPiace: number;
    numeroNonMiPiace: number;
    commenti: Commento[];
    userId: number,
    username: string,
    userImg: string,
    showComments: boolean
    liked: boolean
    disliked: boolean
}

export interface Commento {
    id: Number;
    descrizione: string;
    numeroMiPiace: number;
    numeroNonMiPiace: number;
    userId: number,
    username: string,
    userImg: string,
    liked: boolean,
    disliked: boolean
}
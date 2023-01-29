import { Libro } from "./Libro";

export interface Raccolta{
    id: Number;
    nome: string;
    libri: Libro[];
    numLibri: number;
}
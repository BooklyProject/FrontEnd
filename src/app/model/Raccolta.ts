import { Volume } from "../GoogleBooks/models/volume.interface";

export interface Raccolta{
    id: Number;
    nome: string;
    libri: Volume[];
    numLibri: number;
}
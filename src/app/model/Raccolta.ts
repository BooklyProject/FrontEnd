import { Volume } from "../GoogleBooks/models/volume.interface";

export interface Raccolta{
    id: number;
    nome: string;
    libri: Volume[];
    numLibri: number;
}
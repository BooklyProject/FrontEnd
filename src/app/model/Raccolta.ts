import { User } from "./User"
import { Volume } from "../GoogleBooks/models/volume.interface";

export interface Raccolta{
    id: number;
    nome: String;
    utente: User;
    libri: Volume[];
}
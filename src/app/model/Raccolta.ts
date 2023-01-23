import { User } from "./User"
import { Volume } from "../GoogleBooks/models/volume.interface";

export interface Raccolta{
    id: BigInt
    nome: String
    utente: User
    libro: Volume[]
}
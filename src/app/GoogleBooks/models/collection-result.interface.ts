import { Volume } from "./volume.interface";
export interface CollectionResultModel {
  kind: string;
  totalItems: number;
  items: Volume[];
}

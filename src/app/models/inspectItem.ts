import { SellFor } from "./sellFor";
import { Task } from "./task";

export interface InspectItem {
  inspectImageLink: string;
  name: string;
  usedInTasks: Task[];
  avg24hPrice: number;
  updated: string;
  changeLast48h: number;
  sellFor: SellFor[];
}

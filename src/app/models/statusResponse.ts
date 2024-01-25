import { Message } from "./message";
import { Status } from "./status";

export interface StatusResponse {
    status: {
      currentStatuses: Status[];
      messages: Message[];
    };
}

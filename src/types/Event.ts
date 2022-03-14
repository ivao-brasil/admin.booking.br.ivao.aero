import { Airport } from './Airport';
import { User } from './User';

export enum EventType {
  RFE = 'rfe',
  RFO = 'rfo',
  MSE = 'mse',
}

export enum EventStatus {
  CREATED = 'created',
  SCHEDULED = 'scheduled',
  FINISHED = 'finished',
}

export interface Event {
  id: number;
  dateStart: number;
  dateEnd: number;
  eventName: string;
  privateSlots: number;
  pilotBriefing: string;
  atcBriefing: string;
  description: string;
  banner: string;
  atcBooking: string;
  creator?: User;
  type: EventType;
  status: EventStatus;
  airports: Array<Airport>;
}

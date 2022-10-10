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
  division: string;
  dateStart: string;
  dateEnd: string;
  eventName: string;
  privateSlots: number;
  pilotBriefing: string;
  atcBriefing: string;
  description: string;
  banner: string;
  atcBooking: string;
  status: EventStatus;
  public: boolean;
  creator?: User;
  type: EventType;
  airports: Airport[];
  has_started: boolean;
  has_ended: boolean;
  can_confirm_slots: boolean;
}

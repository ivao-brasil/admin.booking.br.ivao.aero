import Axios, { AxiosInstance } from 'axios';
import { Event, EventType } from '../types/Event';
import { Pagination } from '../types/Pagination';
import { Scenery } from '../types/Scenery';
import { Slot } from '../types/Slot';
import { User } from '../types/User';

interface AuthResponse {
  jwt: string;
}

interface PaginateRequest {
  perPage?: number;
  page?: number;
}

export interface CreateEventRequest {
  dateStart: number;
  dateEnd: number;
  eventName: string;
  privateSlots: number;
  pilotBriefing: string;
  atcBriefing: string;
  description: string;
  banner: string;
  atcBooking: string;
  type: EventType;
  airports: string;
}

interface UserRequest extends PaginateRequest {
  suspended?: boolean;
  vid?: string;
}

const fromObjectToQueryString = (obj: any) => {
  const searchParams = new URLSearchParams();
  Object.keys(obj).forEach(key => searchParams.append(key, obj[key]));
  return searchParams.toString();
};

export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL,
    });
  }

  async auth(ivaoToken: string) {
    return this.axios.post<AuthResponse>('/auth', { 'ivao-token': ivaoToken }).then(response => response.data);
  }

  async getAuth(token: string): Promise<User> {
    return this.axios
      .get<User>('/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        return {
          ...response.data,
          admin: Boolean(response.data.admin),
          suspended: Boolean(response.data.suspended),
        };
      });
  }
  
  async getDivisions(token: string) {
    return this.axios
      .get<Array<string>>('/divisions', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.data);
  }

  async getUsers(data: UserRequest, token: string) {
    const queryString = fromObjectToQueryString(data);
    return this.axios
      .get<Pagination<User>>(`/user?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.data);
  }

  async setUserBlock(user: User, suspended: boolean, token: string) {
    return this.axios.patch<void>(`/user/${user.id}`, { suspended }, { headers: { Authorization: `Bearer ${token}` } }).then(() => {});
  }

  async createEvent(data: CreateEventRequest, token: string) {
    return this.axios
      .post<Partial<Event>>('/event', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {});
  }

  async getEvents(token: string, data: PaginateRequest = {}) {
    const queryString = fromObjectToQueryString(data);
    return this.axios
      .get<Pagination<Event>>(`/event?${queryString}&showAll=true`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.data);
  }

  async updateEvent(eventId: number, data: CreateEventRequest, token: string) {
    return this.axios
      .put<Array<Event>>(`/event/${eventId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.data);
  }

  async deleteEvent(event: Event, token: string) {
    const response = await this.axios
      .delete(`/event/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async getSlotsByEvent(eventId: number, token: string, filter?: PaginateRequest) {
    const queryString = fromObjectToQueryString(filter);
    return this.axios
      .get<Pagination<Slot>>(`/event/${eventId}/slot?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.data);
  }

  async createSlot(eventId: number, data: Partial<Slot>, token: string) {
    const response = await this.axios
      .post(`/event/${eventId}/slot`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async updateSlot(slotId: number, data: Partial<Slot>, token: string) {
    const response = await this.axios
      .put(`/slot/${slotId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async deleteSlot(id: number, token: string) {
    const response = await this.axios
      .delete(`/slot/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async createManySlots(eventId: number, token: string, data: FormData) {
    const response = await this.axios
      .post(`/event/${eventId}/slot/many`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async getScenaries(token: string, data: PaginateRequest = {}) {
    const queryString = fromObjectToQueryString(data);
    return this.axios
      .get<Pagination<Scenery>>(`/scenery?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.data);
  }

  async createScenery(data: Partial<Scenery>, token: string) {
    const response = await this.axios
      .post(`/scenery`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async updateScenery(id: number, data: Partial<Scenery>, token: string) {
    const response = await this.axios
      .put(`/scenery/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async deleteScenery(id: number, token: string) {
    const response = await this.axios
      .delete(`/scenery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  }

  async downloadReport(event: Event, token: string) {
    return this.axios
      .get<Blob>(`/event/${event.id}/export`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      })
      .then(response => {
        const filename = `event_${event.id}_export.csv`;
        this.createTemporaryDownloadLinkForBlob(response.data, filename);
      });
  }

  private createTemporaryDownloadLinkForBlob(blob: Blob, filename: string) {
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  }
}

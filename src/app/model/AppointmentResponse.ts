export class AppointmentResponse {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  status: boolean

  constructor(id: number, description: string, startDate: string, endDate: string, status: boolean) {
    this.id = id;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status
  }
}

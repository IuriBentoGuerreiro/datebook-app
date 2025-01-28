export class AppointmentRequest {
    description: string;
    endDate: string; // Usando string, pois no front-end é mais fácil lidar com strings para datas.
  
    constructor(description: string, endDate: string) {
      this.description = description;
      this.endDate = endDate;
    }
  }
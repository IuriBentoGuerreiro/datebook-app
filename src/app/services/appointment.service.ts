import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../model/AppointmentResponse';
import { AppointmentRequest } from '../model/AppointmentRequest';
import { Pageable } from '../model/Pageable';  // Para tipar os parâmetros de página

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'https://datebook-api.onrender.com'; // URL do back-end

  constructor(private http: HttpClient) {}

  createAppointment(appointmentRequest: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(this.baseUrl, appointmentRequest);
  }

  // Método para obter um compromisso por ID
  getAppointmentById(id: number): Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(`${this.baseUrl}/${id}`);
  }

  getAppointments(params: { page: number; size: number }): Observable<Pageable<AppointmentResponse>> {
    const httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString());

    return this.http.get<Pageable<AppointmentResponse>>(this.baseUrl, { params: httpParams });
  }
  updateAppointment(id: number, appointmentRequest: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.put<AppointmentResponse>(`${this.baseUrl}/${id}`, appointmentRequest);
  }
  
  // Método para deletar um compromisso
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Método para buscar compromissos concluídos com paginação
  listCompleted(page: number, size: number): Observable<Pageable<AppointmentResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Pageable<AppointmentResponse>>(`${this.baseUrl}/completed`, { params });
  }

  // Método para listar compromissos pendentes com paginação
  listPending(pageable: Pageable<AppointmentResponse>): Observable<Pageable<AppointmentResponse>> {
    const params = {
      page: pageable.page.toString(),
      size: pageable.size.toString()
    };
    return this.http.get<Pageable<AppointmentResponse>>(`${this.baseUrl}/pending`, { params });
  }

  // Método para marcar um compromisso como completado
  MarkAsCompleted(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/completed`, null);
  }
}

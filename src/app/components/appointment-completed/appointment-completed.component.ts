import { Component, OnInit } from '@angular/core';
import { AppointmentResponse } from '../../model/AppointmentResponse';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { PageEvent } from '@angular/material/paginator';
import { PaginationComponent } from '../paginator/paginator.component';
import { Pageable } from '../../model/Pageable';

@Component({
  selector: 'app-appointment-completed',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './appointment-completed.component.html',
  styleUrls: ['./appointment-completed.component.scss']
})
export class AppointmentCompletedComponent implements OnInit {
  currentPage: number = 0; // Página inicial
  pageSize: number = 5; // Tamanho da página
  completedAppointments: AppointmentResponse[] = []; // Lista de compromissos concluídos
  totalPages: number = 0; // Total de páginas
  totalElements: number = 0; // Total de elementos

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointmentsCompleted();
  }

  // Disparado quando o usuário muda a página no paginator
  onPageChange(event: PageEvent): void {
    console.log('Página mudou:', event);
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAppointmentsCompleted();
  }

  // Carrega os compromissos concluídos
  loadAppointmentsCompleted(): void {
    this.appointmentService.listCompleted(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.completedAppointments = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = Math.ceil(response.totalElements / this.pageSize);
      });
  }
}

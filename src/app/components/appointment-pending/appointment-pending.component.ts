import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../model/AppointmentResponse';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Pageable } from '../../model/Pageable';
import { PageEvent } from '@angular/material/paginator';
import { PaginationComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-appointment-pending',
  standalone: true,
  imports: [CommonModule, MatIconModule, PaginationComponent],
  templateUrl: './appointment-pending.component.html',
  styleUrls: ['./appointment-pending.component.scss']
})
export class AppointmentPendingComponent implements OnInit {
  currentPage: number = 0;
  pageSize: number = 9;
  pendingAppointments: AppointmentResponse[] = [];
  totalPages: number = 0; 
  totalElements: number = 0;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointmentsPending();
  }

    onPageChange(event: PageEvent): void {
      console.log('Página mudou:', event);
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadAppointmentsPending();
    }

  loadAppointmentsPending(): void {
    const pageable: Pageable<AppointmentResponse> = {
      page: this.currentPage,
      size: this.pageSize,
      totalElements: this.totalElements,
      content: []
    };

    this.appointmentService.listPending(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.pendingAppointments = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      },
      (error) => {
        console.error('Erro ao carregar compromissos pendentes:', error);
      }
    );
  }
  
  markAsCompleted(id: number): void {
    this.appointmentService.MarkAsCompleted(id).subscribe(
      () => {
        this.loadAppointmentsPending();
      },
      (error) => {
        console.error('Erro ao marcar o compromisso como concluído:', error);
        alert('Falha ao marcar o compromisso como concluído.');
      }
    );
  }
}

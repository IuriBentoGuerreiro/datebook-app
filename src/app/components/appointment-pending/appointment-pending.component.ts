import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../model/AppointmentResponse';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { Pageable } from '../../model/Pageable';
import { PageEvent } from '@angular/material/paginator';
import { PaginationComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-appointment-pending',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatIconModule, PaginationComponent],
  templateUrl: './appointment-pending.component.html',
  styleUrls: ['./appointment-pending.component.scss']
})
export class AppointmentPendingComponent implements OnInit {
  currentPage: number = 0;  // Página inicial
  pageSize: number = 5;    // Tamanho da página
  pendingAppointments: AppointmentResponse[] = [];  // Lista de compromissos pendentes
  totalPages: number = 0; // Total de páginas 
  totalElements: number = 0; // Total de elementos

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointmentsPending();
  }

    // Disparado quando o usuário muda a página no paginator
    onPageChange(event: PageEvent): void {
      console.log('Página mudou:', event);
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadAppointmentsPending();
    }

  // Carrega os compromissos pendentes
  loadAppointmentsPending(): void {
    const pageable: Pageable<AppointmentResponse> = {
      page: this.currentPage,
      size: this.pageSize,
      totalElements: this.totalElements,
      content: []
    };

    this.appointmentService.listPending(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.pendingAppointments = response.content; // Atualiza os compromissos
        this.totalElements = response.totalElements; // Atualiza o total de elementos
        this.totalPages = Math.ceil(this.totalElements / this.pageSize); // Atualiza o total de páginas
      },
      (error) => {
        console.error('Erro ao carregar compromissos pendentes:', error);
      }
    );
  }
  
  // Marca um compromisso como concluído
  markAsCompleted(id: number): void {
    this.appointmentService.MarkAsCompleted(id).subscribe(
      () => {
        this.loadAppointmentsPending(); // Recarrega os compromissos pendentes após concluir
      },
      (error) => {
        console.error('Erro ao marcar o compromisso como concluído:', error);
        alert('Falha ao marcar o compromisso como concluído.');
      }
    );
  }
}

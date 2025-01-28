import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../model/AppointmentResponse';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { MatIcon } from '@angular/material/icon';
import { Pageable } from '../../model/Pageable';

@Component({
  selector: 'app-appointment-pending',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatIcon],
  templateUrl: './appointment-pending.component.html',
  styleUrl: './appointment-pending.component.scss'
})
export class AppointmentPendingComponent {
  currentPage: number = 0;  // Página inicial
  pageSize: number = 5;    // Tamanho da página
  pendingAppointments: AppointmentResponse[] = [];  // Variável para armazenar os compromissos
  totalPages: number = 0; // Total de páginas 
  totalElements: number = 0;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointmentsPending();
  }

  // Carrega os compromissos pendentes
  loadAppointmentsPending(): void {
    const pageable: Pageable<AppointmentResponse> = {
      page: this.currentPage, // Página atual
      size: this.pageSize, // Tamanho da página
      totalElements: this.totalElements,
      content: []
    };

    this.appointmentService.listPending(pageable).subscribe(
      (response) => {
        this.pendingAppointments = response.content; // Atualiza os compromissos
        this.totalPages = Math.ceil(response.totalElements / this.pageSize); // Calcula o total de páginas
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
        this.loadAppointmentsPending(); // Recarrega os compromissos pendentes
      },
      (error) => {
        console.error('Erro ao marcar o compromisso como concluído:', error);
        alert('Falha ao marcar o compromisso como concluído.');
      }
    );
  }

   // Altera a página atual e recarrega os compromissos
   changePage(page: number): void {
    if (page >= 0 && page < this.pageSize) {
      this.currentPage = page;
      this.loadAppointmentsPending();
    }
  }
}

import { Component } from '@angular/core';
import { AppointmentResponse } from '../../model/AppointmentResponse';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-appointment-completed',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './appointment-completed.component.html',
  styleUrls: ['./appointment-completed.component.scss'] // Corrigido o nome do atributo para 'styleUrls'
})
export class AppointmentCompletedComponent {
  currentPage: number = 0; // Página inicial
  pageSize: number = 5; // Tamanho da página
  completedAppointments: AppointmentResponse[] = []; // Compromissos concluídos
  totalPages: number = 0; // Total de páginas
  totalElements: number = 0; // Total de compromissos

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointmentsCompleted();
  }

  // Carrega os compromissos concluídos
  loadAppointmentsCompleted(): void {
    this.appointmentService.listCompleted(this.currentPage, this.pageSize).subscribe(
      (response) => {
        // Atualiza os compromissos concluídos e os dados de paginação
        this.completedAppointments = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = Math.ceil(this.totalElements / this.pageSize); // Calcula o total de páginas
      },
      (error) => {
        console.error('Erro ao carregar compromissos concluídos:', error);
      }
    );
  }

  // Altera a página atual e recarrega os compromissos
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) { // Verifica se a página está dentro dos limites
      this.currentPage = page;
      this.loadAppointmentsCompleted();
    }
  }
}

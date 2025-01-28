import { AppointmentService } from './../../services/appointment.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentResponse } from '../../model/AppointmentResponse';
import { AppointmentRequest } from '../../model/AppointmentRequest';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { Pageable } from '../../model/Pageable';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, HeaderComponent],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
  isFormVisible: boolean = false;  // Controla a visibilidade do formulário
  appointments: Pageable<AppointmentResponse> = { content: [], page: 0, size: 10, totalElements: 0 };
  appointment: AppointmentRequest = new AppointmentRequest('', '');
  selectedAppointment: AppointmentResponse | null = null;

  // Variáveis de paginação
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;
  appointmentData: any = {};

  constructor(private appointmentService: AppointmentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAppointments(this.currentPage, this.pageSize);
  }

  loadAppointments(page: number, size: number): void {
    this.appointmentService.getAppointments({ page, size }).subscribe(
      (data) => {
        this.appointments = data;
        this.totalElements = this.appointments.totalElements; // Total de compromissos retornado pela API
        this.totalPages = Math.ceil(this.totalElements / this.pageSize); // Cálculo correto do número de páginas
        this.currentPage = page;
      },
      (error) => {
        console.error('Erro ao carregar compromissos:', error);
        alert('Falha ao carregar compromissos.');
      }
    );
  }

  // Altera a página atual e recarrega os compromissos
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) { // Verifica se a página está dentro do limite
      this.currentPage = page;
      this.loadAppointments(page, this.pageSize);
    }
  }

  cancelEdit(): void {
    this.selectedAppointment = null;
    this.clearForm();
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => {
        this.loadAppointments(this.currentPage, this.pageSize);
      },
      (error) => {
        console.error('Erro ao deletar compromisso:', error);
        alert('Falha ao deletar compromisso.');
      }
    );
  }

  clearForm(): void {
    this.appointment = new AppointmentRequest('', '');
    this.selectedAppointment = null;
  }

  openAppointmentDialog(appointment: any): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: appointment // Passando os dados do compromisso para o diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Compromisso atualizado:', result);
        this.loadAppointments(this.currentPage, this.pageSize); // Atualiza a lista de compromissos após o fechamento do diálogo
      }
    });
  }
  
  

  markAsCompleted(id: number): void {
    this.appointmentService.MarkAsCompleted(id).subscribe(
      () => {
        this.loadAppointments(this.currentPage, this.pageSize);
      },
      (error) => {
        console.error('Erro ao marcar o compromisso como concluído:', error);
        alert('Falha ao marcar o compromisso como concluído.');
      }
    );
  }
}

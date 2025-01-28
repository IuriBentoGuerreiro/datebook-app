import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  appointmentData: any = {}; // Dados do compromisso

  constructor(
    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: any // Recebe os dados passados pelo componente pai
  ) {
    if (data) {
      this.appointmentData = { ...data }; // Se houver dados passados, preenche o formulário para edição
    }
    console.log('Dados recebidos do componente pai:', data);
  }

  close(): void {
    this.dialogRef.close(); // Fecha o diálogo sem retornar dados
  }

  loadAppointmentData(id: number): void {
    this.appointmentService.getAppointmentById(id).subscribe((data) => {
      this.appointmentData = data; // Aqui você preenche o `appointmentData`
      console.log('Dados carregados para edição:', this.appointmentData); // Verifique se o `id` está correto
    });
  }

  save(): void {
    console.log("Dados do compromisso antes de salvar:", this.appointmentData);  // Verifica o conteúdo de appointmentData
    if (this.appointmentData.id) {
      // Se já existe um ID, significa que é um update
      this.appointmentService.updateAppointment(this.appointmentData.id, this.appointmentData).subscribe(
        (response) => {
          console.log('Compromisso atualizado com sucesso:', response);
          this.dialogRef.close(response); // Fecha o diálogo e retorna os dados atualizados
        },
        (error) => {
          console.error('Erro ao atualizar compromisso:', error);
          alert('Erro ao atualizar compromisso. Por favor, tente novamente.');
        }
      );
    } else {
      // Se não existe um ID, é um novo compromisso, então cria
      this.appointmentService.createAppointment(this.appointmentData).subscribe(
        (response) => {
          console.log('Compromisso salvo com sucesso:', response);
          this.dialogRef.close(response); // Fecha o diálogo e retorna os dados salvos
        },
        (error) => {
          console.error('Erro ao salvar compromisso:', error);
          alert('Erro ao salvar compromisso. Por favor, tente novamente.');
        }
      );
    }
  }
}

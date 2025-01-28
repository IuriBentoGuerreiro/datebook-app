import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  features = [
    {
      icon: 'schedule',
      title: 'Agendamento',
      description: 'Planeje e organize seus compromissos facilmente.',
    },
    {
      icon: 'notifications',
      title: 'Notificações',
      description: 'Receba alertas para nunca esquecer nada importante.',
    },
    {
      icon: 'analytics',
      title: 'Relatórios',
      description: 'Acompanhe o progresso com gráficos e relatórios.',
    },
  ];

}

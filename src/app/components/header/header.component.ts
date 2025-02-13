import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon, 
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuVisible = false;

  constructor(private router: Router){}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
    
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');

    this.router.navigate(['/home']); // Redireciona para a tela de login
  }

}

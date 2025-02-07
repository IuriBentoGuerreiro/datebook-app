import { LoginRequest } from './../../model/LoginRequest';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const login: LoginRequest = { username: this.username, password: this.password };
  
    this.authService.login(login).subscribe(
      (response) => {
        console.log('Login bem-sucedido', response); 
        this.router.navigate(['/appointment']);
      },
      (error) => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    );
  }
  
}

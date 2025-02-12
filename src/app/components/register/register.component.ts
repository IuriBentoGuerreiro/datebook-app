import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  usernameTaken: boolean = false; // Indica se o nome de usuário já está em uso
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Inicializa o formulário com as validações
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', Validators.required]
    }, { 
      validator: this.passwordsMatchValidator // Validador customizado para verificar se as senhas são iguais
    });
  }

  // Validador customizado para verificar se as senhas são iguais
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { passwordMismatch: true };
  }

  onRegister(): void {
    // Não envia o formulário se ele for inválido
    if (this.registerForm.invalid || this.usernameTaken) {
      return;
    }

    const user = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    // Chama o método de registro do AuthService
    this.authService.register(user).subscribe(
      (response)=>{
        console.log("registro bem sucedido")
        this.router.navigate(["/login"])
      }
    );
  }

  checkUsername(): void {
    const username = this.registerForm.get('username')?.value?.trim(); // Remove espaços extras
  
    if (username) {
      this.authService.checkUsername(username).subscribe({
        next: (response) => {
          console.log('Resposta da API:', response); // Depuração
  
          this.usernameTaken = response.exists; // Verifica se já existe
  
          if (this.usernameTaken) {
            this.errorMessage = 'Esse nome de usuário já está em uso.';
          } else {
            this.errorMessage = ''; // Limpa a mensagem de erro
          }
  
          this.cdr.detectChanges(); // Força a atualização do Angular
        },
        error: (error) => {
          console.error('Erro ao verificar o nome de usuário:', error);
          this.errorMessage = 'Erro ao verificar o nome de usuário. Tente novamente.';
          this.cdr.detectChanges(); // Atualiza a tela em caso de erro
        }
      });
    }
  }  
}
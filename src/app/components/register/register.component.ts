import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isSubmitting = false;
  registerForm: FormGroup;
  usernameTaken: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', Validators.required]
    }, { 
      validator: this.passwordsMatchValidator 
    });
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { passwordMismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.invalid || this.usernameTaken) {
      return;
    }

    const user = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.authService.register(user).subscribe(
      (response)=>{
        console.log("registro bem sucedido")
        this.router.navigate(["/login"])
      }
    );
  }

  checkUsername(): void {
    const username = this.registerForm.get('username')?.value?.trim();
  
    if (username) {
      this.authService.checkUsername(username).subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);
  
          this.usernameTaken = response.exists;
  
          if (this.usernameTaken) {
            this.errorMessage = 'Esse nome de usuário já está em uso.';
          } else {
            this.errorMessage = ''; 
          }
  
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao verificar o nome de usuário:', error);
          this.errorMessage = 'Erro ao verificar o nome de usuário. Tente novamente.';
          this.cdr.detectChanges();
        }
      });
    }
  }  
}
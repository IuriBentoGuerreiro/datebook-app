import { AuthService } from './../../services/auth.service';
import { User } from './../../model/User';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router){}

  onRegister(){
    const user: User = { username: this.username, password: this.password}

    this.authService.register(user).subscribe(
      (response)=>{
        console.log("registro bem sucedido")
        this.router.navigate(["/login"])
      }
    )
    console.log("erro ao cadastrar")
    this.errorMessage = "erro ao cadastrar"
  }

}

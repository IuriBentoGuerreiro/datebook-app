import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.scss'
})
export class HeaderHomeComponent {

}

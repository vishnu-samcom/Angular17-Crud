import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, UsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'Home Page';
}

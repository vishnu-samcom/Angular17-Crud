import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit {
  countdown = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(countdownInterval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}

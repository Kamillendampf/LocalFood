import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title : string = 'LocalFoodUserInterface';

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.router.navigate(['/login'])
  }
}

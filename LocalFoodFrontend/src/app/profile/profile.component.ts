import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  template: `
    <p>
     Name: Jon Doe <br>
      E-Mail: jonATexampel.de
    </p>
    <div class="position-absolute fixed-bottom">
      <app-navbar></app-navbar>
    </div>
  `,
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}

import { Component } from '@angular/core';
import { SidebaComponent } from './sideba/sideba.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebaComponent]
})

export class AppComponent {
  title = 'app works!';
}

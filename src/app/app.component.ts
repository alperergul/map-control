import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentAreaComponent } from './layout/content-area/content-area.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ContentAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'map-weather';
}

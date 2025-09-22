import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  year = new Date().getFullYear();
  constructor(@Inject(DOCUMENT) public document: Document) {}
}

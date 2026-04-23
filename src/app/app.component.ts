import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListWeeksComponent } from './modules/weeks/pages/list-weeks/list-weeks.component';
import { ProfessorComponent } from './modules/professor/pages/professor.component';
import { OperationalComponent } from './modules/operational/pages/operational.component';
import { NotificationComponent } from './modules/notification/pages/notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListWeeksComponent, ProfessorComponent, OperationalComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestorApp';
}

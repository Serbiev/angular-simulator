import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Сolor';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  companyName: string = 'Румтибет';

  isPrimaryColor (color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  saveLastVisitDate(): void {
    const date: Date = new Date();
    localStorage.setItem('lastVisit', date.toString());
  }

  saveVisitCount(): void {
    const visitCount: string | null = localStorage.getItem('visitCount');
    const count: number = Number(visitCount);
    localStorage.setItem('visitCount', (count + 1).toString());
  }

}

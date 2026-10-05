import { Component, input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import './training';
import { Color } from '../enums/Сolor';
import { IProgram } from '../interfaces/IProgram';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {

  location: string = '';
  date: string = '';
  participants: string = '';
  inputValue: string = '';
  currentDate: Date = new Date();
  count: number = 0;
  serviceProgramId: number = 3;

  isLoading: boolean = true;
  isTimerShown: boolean = true;

  private timerId: ReturnType<typeof setInterval> | null = null;

  readonly companyName: string = 'Румтибет';

  readonly programs: IProgram[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: '/images/tour-programs-guide.svg'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: '/images/tour-programs-safety.svg'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: '/images/tour-programs-prices.svg'
    }
  ];

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.startTimer();
    this.startLoading();
  }

  startLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private startTimer(): void {
    this.timerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private stopTimer(): void {
    if(this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if(this.count > 0) {
      this.count--;
    }
  }

  toggleWidget(): void {
    this.isTimerShown = !this.isTimerShown;
  }

  setActiveProgram(programId: number): void {
    this.serviceProgramId = programId;
  }

  private isPrimaryColor (color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  private saveLastVisitDate(): void {
    const date: Date = new Date();
    localStorage.setItem('lastVisit', date.toString());
  }

  private saveVisitCount(): void {
    const visitCount: string | null = localStorage.getItem('visitCount');
    const count: number = Number(visitCount);
    localStorage.setItem('visitCount', (count + 1).toString());
  }

}
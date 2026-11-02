import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {

  companyName: string = 'Румтибет';
  currentDate: Date = new Date();
  count: number = 0;
  isTimerShown: boolean = true;

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  toggleWidget(): void {
    this.isTimerShown = !this.isTimerShown;
  }

  private startTimer(): void {
    this.timerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }

}

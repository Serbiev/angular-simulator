import './training';
import { Component, inject, input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Color } from '../enums/Сolor';
import { IProgram } from '../interfaces/IProgram';
import { IDestination } from '../interfaces/IDestination';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import { IBlogPost } from '../interfaces/IBlogPost';
import { MessageService } from '../services/message.service';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, DecimalPipe, NgTemplateOutlet, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {

  messageService: MessageService = inject(MessageService);
  private storageService: StorageService = inject(StorageService);

  location!: string;
  date!: string;
  participants!: string;
  inputValue!: string;
  serviceProgramId: number | null = null;
  blogPostId: number | null = null;
  currentDate: Date = new Date();
  count: number = 0;
  companyName: string = 'Румтибет';

  isLoading: boolean = true;
  isTimerShown: boolean = true;
  MessageType: typeof MessageType = MessageType;

  private timerId: ReturnType<typeof setInterval> | null = null;

  programs: IProgram[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'guide'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'safety'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'prices'
    }
  ];

  destinations: IDestination[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      image: 'lake'
    },
    {
      id: 2,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      rating: 4.5,
      image: 'night'
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      price: 230,
      rating: 5.0,
      image: 'rock'
    }
  ];

  blogPosts: IBlogPost[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      image: 'italy'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      image: 'plane'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      image: 'street'
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      image: 'taj-mahal'
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

  setActivePost(postId: number | null): void {
    this.blogPostId = postId;
  }

  setActiveProgram(programId: number | null): void {
    this.serviceProgramId = programId;
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

  private isPrimaryColor (color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  private saveLastVisitDate(): void {
    const date: Date = new Date();
    this.storageService.setItem('lastVisit', date.toString());
  }

  private saveVisitCount(): void {
    const visitCount: number | null = this.storageService.getItem<number>('visitCount');
    const count: number = visitCount ?? 0;
    this.storageService.setItem('visitCount', count + 1);
  }

}
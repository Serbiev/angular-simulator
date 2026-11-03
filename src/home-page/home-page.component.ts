import { Component, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Color } from '../enums/Сolor';
import { IProgram } from '../interfaces/IProgram';
import { IBlogPost } from '../interfaces/IBlogPost';
import { IDestination } from '../interfaces/IDestination';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home-page',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  private storageService: StorageService = inject(StorageService);

  participants!: string;
  inputValue!: string;
  location!: string;
  date!: string;
  isLoading: boolean = false;
  blogPostId: number | null = null;
  serviceProgramId: number | null = null;

  images: string[] = ['balloons', 'camera', 'burj', 'coast', 'canyon', 'flatlay'];

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
  }

  startLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  setActivePost(postId: number | null): void {
    this.blogPostId = postId;
  }

  setActiveProgram(programId: number | null): void {
    this.serviceProgramId = programId;
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
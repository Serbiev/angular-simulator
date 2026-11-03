import './training';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
import './training';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
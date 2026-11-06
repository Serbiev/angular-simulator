import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, TitleCasePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);

}

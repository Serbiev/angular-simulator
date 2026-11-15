import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgTemplateOutlet, TitleCasePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, TitleCasePipe, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);

  messages$: Observable<IMessage[]> = this.messageService.messages$;

}
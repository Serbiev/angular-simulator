import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messages: IMessage[] = [];
  private messageId: number = 0;

  getMessages(): IMessage[] {
    return this.messages;
  }

  addMessage(text: string, type: MessageType): void {
    const newMessage: IMessage = {
      id: ++this.messageId,
      text: text,
      type: type,
    };

    this.messages.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(newMessage.id)
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }

}
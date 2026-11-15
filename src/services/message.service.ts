import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  private messageId: number = 0;

  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }

  showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  private addMessage(text: string, type: MessageType): void {
    const newMessage: IMessage = {
      id: ++this.messageId,
      text: text,
      type: type,
    };

    this.messagesSubject.next([newMessage, ...this.messagesSubject.value]);

    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messagesSubject.next(
      this.messagesSubject.value.filter((msg: IMessage) => msg.id !== id)
    );
  }

}
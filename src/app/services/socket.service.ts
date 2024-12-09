import { Injectable } from '@angular/core';
import{ io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:8000', {});

  constructor() { }
  
  // Escuchar mensajes del backend
  onNewMessage(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('newMessage', (message: string) => {
        subscriber.next(message);
      });
    });
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on("message", (message) => {
        observer.next(message);
      })

      return () => {
        this.socket.disconnect();
      }
    });
  }
}

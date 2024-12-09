import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from './services/message.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  messages: string[] = [];

  constructor(private formBuilder: FormBuilder, 
    private messageService: MessageService, 
    private socketService: SocketService
  ) {
    this.form = this.formBuilder.group({
      message: ''
    });
  }

  ngOnInit(): void {
    // Escuchar mensajes del backend en tiempo real
    this.socketService.onNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  submit() {
    this.messageService.create(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log(response)

      },
      
      error: err => {
        console.log(err);
      }
    
      
    
    
    })
  }
}

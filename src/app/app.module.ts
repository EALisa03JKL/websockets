import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketService } from './services/socket.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [SocketService],
  
})
export class AppModule { }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-available-message',
  templateUrl: './not-available-message.component.html',
  styleUrls: ['./not-available-message.component.scss']
})
export class NotAvailableMessageComponent implements OnInit{

  isMobileDevice: boolean = false;

  constructor() {
    // Detectar si el ancho de la ventana es menor que un valor específico
    this.isMobileDevice = window.innerWidth < 768; // Puedes ajustar el valor según tus necesidades
  }

  ngOnInit(): void {
  }

}

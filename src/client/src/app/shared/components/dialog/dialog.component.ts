import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  content: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: {content: string}) {
    if (data) {
      this.content = data.content || "GAME OVER"
    }
  }
}

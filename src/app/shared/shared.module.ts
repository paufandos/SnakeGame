import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { FooterComponent } from './components/footer/footer.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotAvailableMessageComponent } from './components/not-available-message/not-available-message.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    NotAvailableMessageComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule
  ],
  exports: [HeaderComponent, FooterComponent, DialogComponent, NotAvailableMessageComponent]
})
export class SharedModule { }

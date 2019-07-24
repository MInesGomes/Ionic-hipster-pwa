import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NmsHeaderComponent } from './nms-header/nms-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NmsHeaderComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [NmsHeaderComponent]
})
export class ComponentsModule { }

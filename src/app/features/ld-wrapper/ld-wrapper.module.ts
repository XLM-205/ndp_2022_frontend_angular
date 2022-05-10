import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdWrapperComponent } from './ld-wrapper.component';
import { LdHeaderComponent } from '../ld-header/ld-header.component';
import { LdHeaderModule } from '../ld-header/ld-header.module';



@NgModule({
  declarations: [
    LdWrapperComponent
  ],
  imports: [
    CommonModule,
    LdHeaderModule
  ],
  exports: [
    LdWrapperComponent
  ]
})
export class LdWrapperModule { }

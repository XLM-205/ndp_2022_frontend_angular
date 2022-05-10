import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateEditComponent } from './project-create-edit.component';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { ProjectCreateEditRoutingModule } from './project-create-edit-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';
// Mascaras de entrada
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = { validation: false };



@NgModule({
  declarations: [
    ProjectCreateEditComponent
  ],
  imports: [
    CommonModule,
    ProjectCreateEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    LdWrapperModule,
    LdButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ProjectCreateEditModule { }

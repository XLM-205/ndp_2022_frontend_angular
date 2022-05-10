import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { Helpers } from 'src/app/shared/utils/herlpers';
import { msg } from 'src/app/shared/utils/msg';
import { ProjectCreateEditService } from './services/project-create-edit.service';

@Component({
  selector: 'project-create-edit',
  templateUrl: './project-create-edit.component.html',
  styleUrls: ['./project-create-edit.component.scss']
})
export class ProjectCreateEditComponent implements OnInit {

  msg = msg;
  helpers = Helpers;

  id: string;
  title: string = '';
  actionButtonText: string = '';
  screenType: 'edit' | 'create';

  constructor(private fb: FormBuilder, private router: Router, private projectCreateEditService: ProjectCreateEditService) {
    this.id = history.state.id;
    this.screenType = this.id ? 'edit' : 'create';
   }

  createEditForm: FormGroup = this.fb.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
  })

  ngOnInit(): void {
    this.setScreenTypeTexts();
    this.fillInputs();   
  }

  setScreenTypeTexts() {
    if (this.screenType === 'edit') {
      this.title = "Editar projeto";
      this.actionButtonText = "Salvar";
    }

    else if (this.screenType === 'create') {    
        this.title = "Vamos cadastrar seu novo projeto!";
        this.actionButtonText = "Cadastrar";
    }
  }

fillInputs() {
    if (this.screenType === 'edit') {
        this.projectCreateEditService.getProjectById(this.id).subscribe(
        (response: IProject) => {
            this.createEditForm.patchValue({
              title: response.title,
              totalCost: response.totalCost,
              description: response.description,
            })
        });
    }
}

  cadastrarEditar() {

    if(this.createEditForm.valid) {
      let payload: IProject = this.createEditForm.value;
      payload.idClient = localStorage.getItem('user.id');
      console.log(payload);
      
      if (this.screenType === 'create') {
        this.projectCreateEditService.postProject(payload).subscribe(
          response => {
            alert('Cadastrado com Sucesso!');
            this.router.navigateByUrl('list');
          }
        )
      }
  
      else if (this.screenType === 'edit') {
        this.projectCreateEditService.putProject(payload, this.id).subscribe(
          response => {
            alert('Editado com Sucesso!');
            this.router.navigateByUrl('list');
          }
        )
      }
    }
    else {
      this.createEditForm.markAllAsTouched();
    }

  }
}


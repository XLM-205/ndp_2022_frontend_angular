// @ts-nocheck  //Ignora erros TS (DEBUG)
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from 'src/app/shared/utils/herlpers';
import { msg } from 'src/app/shared/utils/msg';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) { }

  msg = msg;
  helpers = Helpers;
  registerForm: FormGroup = this.fb.group({
      role: ["", [Validators.required]],
      fullname: ["", [Validators.required]],
      birthdate: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
  });

  ngOnInit(): void {
  }

  checkIfRoleIsChecked() {
    for(let radioBttn of document.getElementsByName("role")) {
        if (radioBttn.checked) {
            return true;
        }
    }
    return false;
}

cadastrar() {
    if(this.registerForm.valid) {
        // Payload
        let payload: IUser = this.registerForm.value;
        this.registerService.postUser(payload).subscribe(
            (response) => {
                Swal.fire({
                    title: 'Sucesso',
                    text: 'Usuario Cadastrado',
                    icon: 'success',
                    confirmButtonText: 'Ok!'
                }).then((result) => {
                    if(result.isConfirmed) {
                        // Redirect to project list
                        localStorage.setItem("user.name", response.fullname);
                        localStorage.setItem("user.id", response.id);
                        localStorage.setItem("user.role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
                        
                        this.router.navigateByUrl('list');
                    }
                })
            }
        );
    }
    else {
        this.registerForm.markAllAsTouched();
    }
}

toggleRole(role: 'dev' | 'cliente') {
    this.registerForm.get('role')?.setValue(role);
}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService,
               private root: Router,
               private fb: FormBuilder ) { }

  user: string = ''
  password: string = ''
  hasError: boolean = false
  miFormulario!: FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })
  }
  
  

  login(): void {
    this.loading = true;
    this.user = this.miFormulario.get('user')?.value;
    this.password = this.miFormulario.get('pass')?.value;
    setTimeout(() => {          //se utiliza un settimeout para simular una llamada a un servicio
      this.hasError = !this.auth.login(this.user, this.password);
      this.loading = false;
      if (!this.hasError) {
        this.root.navigate(['/formulario']);
      }
    }, 2000);
  }


}

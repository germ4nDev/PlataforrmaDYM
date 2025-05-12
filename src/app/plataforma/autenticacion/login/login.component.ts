/* eslint-disable @typescript-eslint/no-explicit-any */
// Angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// import { first } from 'rxjs/operators';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  // public method
  usernameValue = 'info@codedthemes.com';
  userPassword = '123456';

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl!: string;
  classList!: { toggle: (arg0: string) => void };

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/dashboard/analytics']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword?.addEventListener('click', () => {
      // toggle the type attribute
      const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
      password?.setAttribute('type', type);

      // toggle the icon
      this.classList.toggle('icon-eye-off');
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  // convenience getter for easy access to form fields
  get formValues() {
    return this.loginForm.controls;
  }

  onLoignUserClick() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;
    const email = this.formValues?.['username']?.value;
    const password = this.formValues?.['password']?.value;
    console.log('email', email);
    console.log('password', password);
    this.authenticationService
    .login(email, password)
    .subscribe((resp: any) => {
        console.log('resp', resp);
        if (resp.ok == false) {
            Swal.fire({
            title: resp.msg,
            text: 'La dirección de correo electrónico ingresada no se encuentra registrada en nuestro sistema!',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false
            }).then((willDelete) => {
                if (willDelete.dismiss) {
                    Swal.fire('', 'Your imaginary file is safe!', 'error');
                }
            });
            this.loading = false;
        } else {
            // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            // localStorage.setItem('email', resp.usuario.email);
            // localStorage.setItem('cliente', resp.usuario.cliente);
            // localStorage.setItem('empresa', resp.usuario.empresa);
            // localStorage.setItem('operador', resp.usuario.operador);
            // localStorage.setItem('roles', JSON.stringify(resp.usuario.roles));
            // localStorage.setItem('niveles', JSON.stringify(resp.usuario.niveles));
            // if (this.remember) {
            //   localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            // } else {
            //   localStorage.setItem('email', this.email);
            //   localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            // }
            // console.log('estoty aca', resp);
            // const roles = this.usuarioService.usuario.roles;
            // console.log('aca esta  el usuario', roles);
            // roles.forEach(role => {
            //   this.usuarioService.isUserlInRole(role).subscribe(data => {
            //     console.log('rrsultado', data);
            //   });
            // });
            // Navegar al Dashboard
            // this.router.navigate(['/frontal/inicio']);

            console.log('Mail Encontrado', resp);
            this.loading = false;
        }
    }, (err) => {
        this.error = err;
        this.loading = false;
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
    });
  }

}

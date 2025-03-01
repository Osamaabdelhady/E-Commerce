import { AuthService } from './../../../Core/Services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  AuthService: any;

  constructor(private auth: AuthService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })

  submitForm() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res:any) => {
          this.isLoading = false;

          if (res.message = "success") {
            this.router.navigate(['/home'])
            localStorage.setItem('UserToken',res.token)
            this.AuthService.decodeUser();
          }
          console.log(res)
        },
        error: (err) => {
          this.isLoading = false;

          this.errMsg = err.error.message;
          console.log(err.error.message);
        }
      })
    }
  }

}

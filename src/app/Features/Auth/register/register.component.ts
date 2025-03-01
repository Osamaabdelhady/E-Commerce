import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errMsg: string = '';
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]\w{7}$/)]),
    rePassword: new FormControl(null, [Validators.required,]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmPassword)                       // {Validators:this.confirmPassword}

  // Custom Vaildation
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true }
    }
  }

  submitForm() {
    this.isLoading = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;

          if (res.message = "success") {
            this.router.navigate(['/login'])
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




import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetpasswordService } from '../../../Core/Services/resetpass/resetpassword.service';
import { AuthService } from '../../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {

  steps: number = 1;

  constructor(private reset:ResetpasswordService,private toastr:ToastrService,private auth:AuthService,private router:Router) { }



  sendEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })
  submitEmail(){
    this.reset.verfyEmail(this.sendEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg == "success"){
          this.steps = 2;
          this.toastr.success(res.message,'Success',{
            progressBar: true,
            positionClass:"toast-top-left",
            progressAnimation:"increasing",
            closeButton:true,
        })
        }
      }
    })
  }



  VerfyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)]),
  })
  submitCode(){
    this.reset.verfyCode(this.VerfyCode.value).subscribe({
      next:(res)=>{
        if(res.status == 'Success'){
          this.steps = 3;
          this.toastr.success(res.message,'Success')
        }
      }
    })
  }

  

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required]),

  })
  submitPassword(){
    this.reset.resetpassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        if(res.token){
          localStorage.setItem('UserToken',res.token);
          this.auth.decodeUser();
          this.router.navigate(['/home'])
        }
      }
    })
  }
}

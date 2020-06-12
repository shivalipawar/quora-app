import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  
  constructor(private router :Router,
    private authService : AuthService) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls(){
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
    });
  
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  cancel(){
    this.forgotPasswordForm.reset();
  }

  getFormControls(){
    return this.forgotPasswordForm.controls;
  }

  submitForm(){
    if (this.forgotPasswordForm.valid) {
      const loginUser = {
        email:this.getEmail(),
      }

      this.authService.forgotPassword(loginUser).subscribe((res)=>{
        console.log(res);
          alert("Go to PR Form");
          this.forgotPasswordForm.reset();
      },err =>{
        console.log("Error: "+JSON.stringify(err));
        return err;
      })
    }
  }

  forgotPassword(){
    this.router.navigateByUrl('/forgot-password');
  }

  private getEmail():string {
    return this.getFormControls().email.value;
  }

}

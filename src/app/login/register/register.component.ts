import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private router :Router,
    private authService : AuthService) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls() {
    this.signupForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  getFormControls(){
    return this.signupForm.controls;
  }

  private getPassword():string {
    return this.getFormControls().password.value;
  }

  private getUsername():string {
    return this.getFormControls().username.value;
  }

  private getEmail():string { 
    return this.getFormControls().email.value;
  }

  register(){
    if (this.signupForm.valid) {
      const signupUser = {
        username:this.getUsername(),
        email :this.getEmail(),
        password :this.getPassword(),
        role : 'user'
      }
      this.authService.register(signupUser).subscribe((res)=>{
        console.log(res);
        if(res){
          alert("Register Success");
          this.signupForm.reset();
        }else{
          console.log("Login failed");
        }
      },err =>{
        console.log("Error: "+JSON.stringify(err));
        return err;
      })
    }
  }

  login(){
    this.router.navigateByUrl('/');
  }

}

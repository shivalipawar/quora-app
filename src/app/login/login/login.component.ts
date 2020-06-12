import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginToken :string;
  
  constructor(private router :Router,
    private authService : LoginService) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls(){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  getFormControls(){
    return this.loginForm.controls;
  }

  submitForm(){
    if (this.loginForm.valid) {
      const loginUser = {
        username:this.getUsername(),
        password :this.getPassword()
      }

      this.authService.login(loginUser).subscribe((res)=>{
        console.log(res);
        if(res){
          this.loginToken = res.token;
          alert("Login Success");
        }else{
          console.log("Login failed");
        }
      },err =>{
        console.log("Error: "+JSON.stringify(err));
        return err;
      })
    }
  }

  private getPassword():string {
    return this.getFormControls().password.value;
  }

  private getUsername():string {
    return this.getFormControls().username.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router :Router,
    private loginService : LoginService) { }

  ngOnInit() {
  }

  register(){
    if (this.signupForm.valid) {
      const name = this.signupForm.controls.username;
      const email = this.signupForm.controls.email;
      const password = this.signupForm.controls.password;
      const signupUser = {
        username:name,
        email :email,
        password :password,
        role : 'user'
      }
      this.loginService.register(signupUser);
      alert("Register Success");
    }
  }

  login(){
    this.router.navigateByUrl('/');
  }

}

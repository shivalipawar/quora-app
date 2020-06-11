import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(private router :Router) { }

  ngOnInit() {
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  login(){
    if (this.loginForm.valid) {
      alert("Login Success");
    }
  }
}

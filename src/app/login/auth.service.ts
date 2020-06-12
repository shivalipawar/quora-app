import { Injectable } from '@angular/core';
import { HTTPService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService :HTTPService) { }

  healthCheck(){
    return this.httpService.get(`http://localhost:3000/health`);
  }

  login(user){
     return this.httpService.post(`http://localhost:3000/login`,user)
  }

  register(user){
    return this.httpService.post(`http://localhost:3000/signup`,user);
  }
  
  forgotPassword(email){
    return this.httpService.post(`http://localhost:3000/forgot-password`,email,'text/html');
  }
}

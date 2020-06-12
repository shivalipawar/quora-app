import { TestBed, async } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HTTPService } from '../shared/services/http.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let mockHttpService;
  let service: LoginService;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj(['post','get']);
    TestBed.configureTestingModule({
      providers : [{provide : HTTPService, useValue:mockHttpService}]
    })
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('should return get healthcheck response',async(done)=>{
    const url = "http://localhost:3000/health";
    const resObj = of({message:"Welcome to user auth application"});
    mockHttpService.get.and.returnValue(resObj);

    const result = service.healthCheck();

    expect(result).toBe(resObj);
    expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    expect(mockHttpService.get).toHaveBeenCalledWith(url);
    done();
  })

  it('should return a observable when login called',async(done)=>{
    const user = {
      username:"abc",
      password : "123$̥"
    }
    const url = "http://localhost:3000/login";
    const resObj = of({token:"sdgshdsdhdhudhnjsdhoidhoi"});
    mockHttpService.post.and.returnValue(resObj);

    const result = service.login(user);

    expect(result).toBe(resObj);
    expect(mockHttpService.post).toHaveBeenCalledTimes(1);
    expect(mockHttpService.post).toHaveBeenCalledWith(url,user);
    done();
  })

  it('should return a observable with error when login called with parameters incorrect',async(done)=>{
    const url = "http://localhost:3000/login";
    const errRes = of({
      status: 400,
      statusMessage:"Bad Request",
      res : {
        message : "User not signed up"
      }
    });
    mockHttpService.post.and.returnValue(errRes);

    const result = service.login(null);

    expect(result).toBe(errRes);
    expect(mockHttpService.post).toHaveBeenCalledTimes(1);
    expect(mockHttpService.post).toHaveBeenCalledWith(url,null);
    done();
  })

});

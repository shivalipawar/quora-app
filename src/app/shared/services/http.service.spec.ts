import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} 
       from '@angular/common/http/testing';
import { HTTPService } from './http.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('HTTPService', () => {
  let httpTestingController: HttpTestingController;
  let service: HTTPService;

  beforeEach(() => 
  {
    TestBed.configureTestingModule({
    // providers : [{provide : HttpClient , useValue : HttpClientTestingModule}]
    imports : [HttpClientTestingModule],
    providers : [HTTPService]
  })
  httpTestingController = TestBed.get(HttpTestingController);
  service = TestBed.get(HTTPService)
});

afterEach(() => {
  httpTestingController.verify();
});

  it('should be created', () => {
    const service: HTTPService = TestBed.get(HTTPService);
    expect(service).toBeTruthy();
  });

  it('should return observable for get method',async(done)=>{
    const url = "http://localhost/health";
    const res = {
      message : "Welcome to user auth backend"
    }
    service.get(url).subscribe(res=>{
      expect(res).toBeDefined();
      expect(res.value.message).toBe(`Welcome to user auth backend`);
    })

    const req = httpTestingController.expectOne(url);

    req.flush(of(res));
    done();
  })

  it('should return error status in observable for post method with incomplete data',async(done)=>{
    const url = "http://localhost/health";
    const res = {
      status :  400,
      message : "User not signed up"
    }
    service.post(url,null).subscribe(res=>{
      expect(res).toBeDefined();
      expect(res.value.message).toBe(`User not signed up`);
      expect(res.value.status).toBe(400);
    })

    const req = httpTestingController.expectOne(url);

    req.flush(of(res));
    done();
  })


  it('should return observable for post method',async(done)=>{
    const url = "http://localhost/login";
    const user = {
      username :"abc",
      password : "xyz"
    }
    const res = {
      status :  200,
      message : "Login success"
    }
    service.post(url,user).subscribe(res=>{
      expect(res).toBeDefined();
      expect(res.value.status).toBe(200);
      expect(res.value.message).toBe(`Login success`);
    })

    const req = httpTestingController.expectOne(url);

    req.flush(of(res));
    done();
  })

  it('should return observable for delete method',async(done)=>{
    const url = "http://localhost/login";
    const id = 2
    const res = {
      status :  200,
      message : "Delete success"
    }
    service.delete(url,id).subscribe(res=>{
      expect(res).toBeDefined();
      expect(res.value.status).toBe(200);
      expect(res.value.message).toBe(`Delete success`);
    })

    const req = httpTestingController.expectOne(url);

    req.flush(of(res));
    done();
  })

  it('should return error in observable for delete method with incorrect params',async(done)=>{
    const url = "http://localhost/login";
    const id = 2
    const res = {
      status :  400,
      message : "User not found"
    }
    service.delete(url,id).subscribe(res=>{
      expect(res).toBeDefined();
      expect(res.value.status).toBe(400);
      expect(res.value.message).toBe(`User not found`);
    })

    const req = httpTestingController.expectOne(url);

    req.flush(of(res));
    done();
  })

});

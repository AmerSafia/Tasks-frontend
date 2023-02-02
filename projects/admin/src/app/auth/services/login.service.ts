import { Login } from './../context/DTOs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http:HttpClient) { }

  login(model:Login){
    return this.http.post('https://cruds-el2j.onrender.com/auth/login',model)
  }
}

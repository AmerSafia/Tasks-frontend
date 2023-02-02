import { LoginResponse } from './../../context/DTOs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private service: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  loginForm!: FormGroup
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      role: ["admin"]
    })
  }

  login() {
    this.spinner.show();
    this.service.login(this.loginForm.value).subscribe((res:any) => {
      localStorage.setItem('token',res.token)
      this.toastr.success('success', 'success login')
      this.router.navigate(['tasks'])
    }, error => {
      this.toastr.error(error.error.message)
    })
      this.spinner.hide();

  }
}

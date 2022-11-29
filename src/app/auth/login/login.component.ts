import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  users: Users[] = [];
  token = '';
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      //this.authService.redirectUrl;
      this.router.navigate(['']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get username():any
  {
    return this.loginForm.get('username');
  }
  get password():any
  {
    return this.loginForm.get('password');
  }

  onLogin():void{
    this.submitted = true;
    this.authService.login(this.username.value, this.password.value)
    .subscribe({
      next: (response) => {
      },
      error: (error) => {
        this.authService.showToasterError('','Sai tên đăng nhập hoặc mật khẩu!');
      },
      complete: () => {
        this.authService.ngOnInit();
        this.authService.redirectUrl;
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

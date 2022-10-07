import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
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
  subscription: SubscriptionLike;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
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
    this.subscription = this.authService.login(this.username.value, this.password.value).subscribe((data) => {
        //
      },
    );
  }

  getDataUser():void{
    this.subscription = this.authService.getAll().subscribe((data: Users[])=>{
      this.users = data;
      console.log(this.users);
    })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

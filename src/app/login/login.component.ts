import { AuthService } from './../common/services/auth.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  loginInvalid: boolean;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private logServ: LoginService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

   onSubmit() {
     if (this.form.valid) {
      this.isLoading = true;
      this.logServ.login(this.form.value)
       .subscribe(({token}) => {
          this.isLoading = false;
          this.authServ.logIn(token);
        },
        () => {
          this.isLoading = false;
        }
       );
    }
  }
}

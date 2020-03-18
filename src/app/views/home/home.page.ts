import { Component } from '@angular/core';
import { AuthService } from '../../config/service/auth-service.service';
import { Router } from '@angular/router';
import { ErrorModel } from '../../config/models/error-model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading = false;
  email: string;
  password: string;
  response: any;
  hasError: boolean;
  please: any;

  data = {
    email: '',
    password: '',
    returnSecureToken: true
   };
  constructor(public route: Router, private service: AuthService ) { }
  error: ErrorModel;

  submit() {
    this.loading = true;
    if (this.email === undefined || this.password === undefined) {
      this.loading = false;
      this.hasError = true;
      return;
    }
    this.hasError = false;
    this.service.getToken(this.email, this.password)
    .subscribe((data) => {
      this.please = data;
      this.loading = false;
    }, (error) => {
        this.loading = false;
        this.hasError = true;
        this.error = error.error.error.errors[0].message;
      });
  }
}

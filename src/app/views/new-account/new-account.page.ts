import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OverallService } from '../../config/service/overall-service.service';
import { ErrorModel } from '../../config/models/error-model';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {
  loading = false;
  accountNbr: any;
  add: any;
  accounts: any;
  put: any;
  response: any;
  ans: any;
  error: any;
  hasError: any;
  isDisabled: boolean;
  data = {
    balance: 0,
    overdraft: 0
  };

  constructor(public route: Router, private http: HttpClient, private auth: OverallService) { }

  ngOnInit(): void {
    // getting the accounts
    this.isDisabled = true;
    this.auth.fetchAccounts().subscribe((response) => {
      this.response = response;
    });
  }

  create() {
    this.loading = true;
    this.isDisabled = false;
    this.accountNbr = Math.floor(Math.random() * 10000000);
    this.accountNbr =  this.accountNbr.toString();
    console.log(this.response);
    this.response.push(this.accountNbr);
    console.log(this.response);
   // adding new acount to the other accounts
    this.auth.newAccount(this.accountNbr).subscribe
     ((add) => {
       this.add = add;
     });
     // adding the accounts to the clients
    this.auth.addAcocunt(this.response).subscribe
    ((put) => {
      this.loading = false;
      this.put = put;
    }, (error) => {
      this.loading = false;
      this.hasError = true;
      this.error = error;
   });
  }
  refresh() {
    location.reload();
  }
}

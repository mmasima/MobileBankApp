import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OverallService } from '../../config/service/overall-service.service';
import { ErrorModel } from '../../config/models/error-model';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  loading = false;
  response: any;
  checker: any;
  account: any;
  overview: any;
  error: ErrorModel;
  hasError: boolean;
  data = {
    balance: 0,
    overdraft: 0
  };
  passiveEventListener: boolean;

  constructor(public route: Router, private http: HttpClient, private auth: OverallService) { }
  ngOnInit(): void {
    this.auth.getAccounts().subscribe((response) => {
      this.response = response;
      console.log(this.response);
    });
}
   displayAccount(account) {
     this.account = account;
  }
  show() {
    this.loading = true;
    if (this.account === undefined) {
      this.loading = false;
      this.hasError = true;
      return;
    }
    // displaying account details to user
    this.hasError = false;
    this.auth.accountDetails(this.account).subscribe((overview) => {
      this.loading = false;
      this.overview = overview;
      console.log(this.overview);
      if (this.overview === null) {
        this.auth.depositMoney(this.account , this.data.balance, this.data.overdraft).subscribe((checker) => {
          this.loading = false;
          this.checker = checker;
        });
      }
    }, (error) => {
      this.loading = false;
      this.hasError = true;
      this.error = error;
      }
    );
  }
}

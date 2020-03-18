import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
})
export class StartPagePage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }
  logout() {
    // remove user from local storage to log user out
    location.reload();
    sessionStorage.clear();
    this.route.navigate(['']);
  }
}


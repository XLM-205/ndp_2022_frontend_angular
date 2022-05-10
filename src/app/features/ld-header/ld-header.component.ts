import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/IUser';

@Component({
  selector: 'ld-header',
  templateUrl: './ld-header.component.html',
  styleUrls: ['./ld-header.component.scss']
})
export class LdHeaderComponent implements OnInit {

  user: IUser = {}; // Undefined by default

  ngOnInit(): void {
    this.buildHeader();
  }

  buildHeader() {
     // If the user is logged in: display name, picture and role
    if (this.isUserLoggedIn()) {
      // 'x || y' if x is undefined, then use y
      this.user.name = localStorage.getItem("user.name") || '';
      this.user.role = localStorage.getItem("user.role") || '';
    }
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem("user.name") !== null && localStorage.getItem("user.role") !== null;
  }
}

import { Component, OnInit } from '@angular/core';

import { User } from "../../models/user";
import { AdminService } from "../../services/admin.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    currentUser: User;

    constructor(
        private authenticationService: AuthenticationService,
        private adminService: AdminService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
    }

}

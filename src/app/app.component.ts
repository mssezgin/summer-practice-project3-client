import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { AlertService } from "./services/alert.service";
import { AuthenticationService } from "./services/authentication.service";
import { User } from "./models/user";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    currentUser!: User; // TODO: not initialized error

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login'], { queryParams: { reason: 'logout' } });
    }

}

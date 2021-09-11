import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";

import { AuthenticationService } from "../../services/authentication.service";
import { AlertService } from "../../services/alert.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    loginForm!: FormGroup; // TODO: not initialized error
    loading = false;
    submitted = false;
    returnUrl!: string; // TODO: not initialized error

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/user']);
        }
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
        switch (this.route.snapshot.queryParams['reason']) {
            case 'sessionExpired':
                this.alertService.error('Session expired.');
                break;
            case 'logout':
                this.alertService.success('Logout successful');
                break;
        }
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log('--Login onSubmit-- loginForm.value: ', this.loginForm.value); // TODO: delete this
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                value => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

}

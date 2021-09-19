import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { User } from "../../../models/user";
import { AlertService } from "../../../services/alert.service";
import { AdminService } from "../../../services/admin.service";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

    isCreateMode: boolean = true;
    userId!: string;
    user?: User;
    userForm!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params['id'];
        this.isCreateMode = !this.userId;

        this.userForm = this.formBuilder.group({
            _id: [''],
            createdAt: [''],
            updatedAt: [''],
            admin: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            email: ['', [(this.isCreateMode ? Validators.required : Validators.nullValidator), Validators.email]],
            username: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            password: ['', [(this.isCreateMode ? Validators.required : Validators.nullValidator), Validators.minLength(8)]],
            firstname: [''],
            lastname: [''],
            gender: [''],
            birth: ['']
        });

        if (!this.isCreateMode) {
            this.adminService.reqGetUserByUserID(this.userId)
                .pipe(first())
                .subscribe(value => {
                    this.user = value;
                    this.setUserFormValues();
                })
        }
    }

    get f() { return this.userForm.controls; }

    getUserFormValues() {
        let values: any = { };
        if (this.f.admin.value != '') values.admin = this.f.admin.value;
        if (this.f.email.value != '') values.email = this.f.email.value;
        if (this.f.username.value != '') values.username = this.f.username.value;
        if (this.f.password.value != '') values.password = this.f.password.value;
        if (this.f.firstname.value != '') values.firstname = this.f.firstname.value;
        if (this.f.lastname.value != '') values.lastname = this.f.lastname.value;
        if (this.f.gender.value != '') values.gender = this.f.gender.value;
        if (this.f.birth.value != '') values.birth = this.f.birth.value;
        return values;
    }

    setUserFormValues() {
        if (this.user) { // TODO: use patchValue
            this.userForm.setValue({
                _id: this.user._id,
                createdAt: this.user.createdAt,
                updatedAt: this.user.updatedAt,
                admin: this.user.admin,
                email: this.user.email,
                username: this.user.username,
                password: '',
                firstname: this.user.firstname || '',
                lastname: this.user.lastname || '',
                gender: this.user.gender || '',
                birth: this.user.birth || ''
            });
        }
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.userForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.isCreateMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.adminService.reqCreateUser(this.getUserFormValues())
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User created successfully.', true);
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.adminService.reqUpdateUser(this.userId, this.getUserFormValues())
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User updated successfully.', true);
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

}

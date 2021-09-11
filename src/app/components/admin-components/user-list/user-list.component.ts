import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { User } from "../../../models/user";
import { ListResponse } from "../../../models/list-response";
import { AdminService } from "../../../services/admin.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    qp = {
        sort: "_id",
        page: 1
    };
    userList: ListResponse<User> = {
        totalSize: 0,
        totalPages: 0,
        pageSize: 0,
        page: 0,
        result: []
    };
    pages!: Array<number>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(value => {
            for (let key in value) {
                // @ts-ignore
                this.qp[key] = value[key];
            }
            this.getAllUsers();
        });
    }

    getAllUsers() {
        this.adminService.reqGetAllUsers(this.qp)
            .pipe(first())
            .subscribe(value => {
                this.userList = value;
                this.pages = [...Array(value.totalPages + 1).keys()].slice(1);
            });
    }

    deleteUser(userId: string) {
        const user = this.userList.result.find(x => x._id === userId);
        (user as any).isDeleting = true;
        if (window.confirm('Are you sure?')) {
            this.adminService.reqDeleteUser(userId)
                .pipe(first())
                .subscribe(value => {
                    this.alertService.success('User deleted successfully.', true);
                    this.getAllUsers();
                });
        } else {
            (user as any).isDeleting = false;
        }
    }

    getSort(sort: string) {
        return this.qp.sort === sort ? '-' + sort : sort;
    }

}

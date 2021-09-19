import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { Log } from "../../../models/log";
import { ListResponse } from "../../../models/list-response";
import { AdminService } from "../../../services/admin.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'app-log-list',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

    qp = {
        sort: "-when",
        page: 1
    };
    logList: ListResponse<Log> = {
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
            this.getAllLogs();
        });
    }

    getAllLogs() {
        this.adminService.reqGetAllLogs(this.qp)
            .pipe(first())
            .subscribe(value => {
                this.logList = value;
                this.pages = [...Array(value.totalPages + 1).keys()].slice(1);
            });
    }

    deleteLog(logId: string) {
        const log = this.logList.result.find(x => x._id === logId);
        (log as any).isDeleting = true;
        if (window.confirm('Are you sure?')) {
            this.adminService.reqDeleteLog(logId)
                .pipe(first())
                .subscribe(value => {
                    this.alertService.success('Log deleted successfully.', true);
                    this.getAllLogs();
                });
        } else {
            (log as any).isDeleting = false;
        }
    }

    getSort(sort: string) {
        return this.qp.sort === sort ? '-' + sort : sort;
    }

}

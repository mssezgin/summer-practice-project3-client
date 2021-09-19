import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { Message } from "../../../models/message";
import { ListResponse } from "../../../models/list-response";
import { AdminService } from "../../../services/admin.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

    qp = {
        sort: "-when",
        page: 1
    };
    messageList: ListResponse<Message> = {
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
            this.getAllMessages();
        });
    }

    getAllMessages() {
        this.adminService.reqGetAllMessages(this.qp)
            .pipe(first())
            .subscribe(value => {
                this.messageList = value;
                this.pages = [...Array(value.totalPages + 1).keys()].slice(1);
            });
    }

    deleteMessage(messageId: string) {
        const message = this.messageList.result.find(x => x._id === messageId);
        (message as any).isDeleting = true;
        if (window.confirm('Are you sure?')) {
            this.adminService.reqDeleteMessage(messageId)
                .pipe(first())
                .subscribe(value => {
                    this.alertService.success('Message deleted successfully.', true);
                    this.getAllMessages();
                });
        } else {
            (message as any).isDeleting = false;
        }
    }

    getSort(sort: string) {
        return this.qp.sort === sort ? '-' + sort : sort;
    }

}

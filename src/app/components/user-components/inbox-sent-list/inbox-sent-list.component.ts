import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { Message } from "../../../models/message";
import { ListResponse } from "../../../models/list-response";
import { UserService } from "../../../services/user.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'app-inbox-sent-list',
    templateUrl: './inbox-sent-list.component.html',
    styleUrls: ['./inbox-sent-list.component.css']
})
export class InboxSentListComponent implements OnInit {

    qp = {
        sort: "-when",
        page: 1
    };
    inboxOrSent: string;
    messageList: ListResponse<Message> = {
        totalSize: 0,
        totalPages: 0,
        pageSize: 0,
        page: 1,
        result: []
    };
    pages!: Array<number>;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
    ) {
        this.inboxOrSent = this.router.url.endsWith('sent') ? 'sent' : 'inbox';
    }

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
        this.loading = true;
        this.userService.reqGetAllMessages(this.inboxOrSent, this.qp)
            .pipe(first())
            .subscribe(value => {
                this.messageList = value;
                this.pages = [...Array(value.totalPages + 1).keys()].slice(1);
                this.loading = false;
            });
    }

    deleteMessage(messageId: string) {
        const message = this.messageList.result.find(x => x._id === messageId);
        (message as any).isDeleting = true;
        this.userService.reqDeleteMessage(messageId)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Message deleted successfully.', true);
                this.getAllMessages();
            }, error => {
                // this.alertService.error('Some error occurred while deleting message.', true);
                this.getAllMessages();
            });
    }

    getSort(sort: string) {
        return this.qp.sort === sort ? '-' + sort : sort;
    }

}

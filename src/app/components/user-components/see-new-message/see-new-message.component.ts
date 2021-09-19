import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Message } from "../../../models/message";
import { UserService } from "../../../services/user.service";
import { AlertService } from "../../../services/alert.service";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
    selector: 'app-see-new-message',
    templateUrl: './see-new-message.component.html',
    styleUrls: ['./see-new-message.component.css']
})
export class SeeNewMessageComponent implements OnInit {

    isNewMode: boolean = true;
    messageId!: string;
    message?: Message;
    messageForm!: FormGroup;
    loading = false;
    deleting = false;
    submitted = false;
    candidates: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.messageId = this.route.snapshot.params['id'];
        this.isNewMode = !this.messageId;

        this.messageForm = this.formBuilder.group({
            when: [''],
            from: [''],
            to: ['', (this.isNewMode ? Validators.required : Validators.nullValidator)],
            subject: [''],
            body: ['']
        });

        if (!this.isNewMode) {
            this.userService.reqGetMessageByMessageID(this.messageId)
                .pipe(first())
                .subscribe(value => {
                    this.message = value;
                    this.setUserFormValues();
                });
        }
    }

    get f() { return this.messageForm.controls; }

    getUserFormValues() {
        let values: any = { };
        if (this.f.to.value != '') values.to = { username: this.f.to.value };
        if (this.f.subject.value != '') values.subject = this.f.subject.value;
        if (this.f.body.value != '') values.body = this.f.body.value;
        return values;
    }

    setUserFormValues() {
        if (this.message) {
            this.messageForm.setValue({
                when: this.message.when,
                from: this.message.from.username,
                to: this.message.to.username,
                subject: this.message.subject || '',
                body: this.message.body || ''
            });
        }
    }

    deleteMessage(messageId: string) {
        this.deleting = true;
        this.userService.reqDeleteMessage(messageId)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Message deleted successfully.', true);
                    this.router.navigate(['../'], {relativeTo: this.route});
                },
                error: err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            });
    }

    searchUsers(e: any) {
        if (e.target.value.length > 1) {
            this.userService.reqSearchUsers(e.target.value)
                .pipe(first())
                .subscribe(value => {
                    // @ts-ignore
                    this.candidates = value;
                });
        }
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.messageForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.reqCreateMessage(this.getUserFormValues())
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Message sent successfully.', true);
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            });
    }

}

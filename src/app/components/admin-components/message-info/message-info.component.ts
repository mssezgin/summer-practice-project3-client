import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Message } from "../../../models/message";
import { AdminService } from "../../../services/admin.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'app-message-info',
    templateUrl: './message-info.component.html',
    styleUrls: ['./message-info.component.css']
})
export class MessageInfoComponent implements OnInit {

    isCreateMode: boolean = true;
    messageId!: string;
    message?: Message;
    messageForm!: FormGroup;
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
        this.messageId = this.route.snapshot.params['id'];
        this.isCreateMode = !this.messageId;

        this.messageForm = this.formBuilder.group({
            _id: [''],
            when: [''],
            updatedAt: [''],
            seen: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            from: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            fromDeletedThis: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            to: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            toDeletedThis: ['', (this.isCreateMode ? Validators.required : Validators.nullValidator)],
            subject: [''],
            body: ['']
        });

        if (!this.isCreateMode) {
            this.adminService.reqGetMessageByMessageID(this.messageId)
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
        if (this.f.seen.value != '') values.seen = this.f.seen.value;
        if (this.f.from.value != '') values.from = {
            username: this.f.from.value,
            deletedThis: this.f.fromDeletedThis.value
        };
        if (this.f.to.value != '') values.to = {
            username: this.f.to.value,
            deletedThis: this.f.toDeletedThis.value
        };
        if (this.f.subject.value != '') values.subject = this.f.subject.value;
        if (this.f.body.value != '') values.body = this.f.body.value;
        return values;
    }

    setUserFormValues() {
        if (this.message) { // TODO: use patchValue
            this.messageForm.setValue({
                _id: this.message._id,
                when: this.message.when,
                updatedAt: this.message.updatedAt,
                seen: this.message.seen,
                from: this.message.from.username,
                fromDeletedThis: this.message.from.deletedThis,
                to: this.message.to.username,
                toDeletedThis: this.message.to.deletedThis,
                subject: this.message.subject || '',
                body: this.message.body || ''
            });
        }
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        console.log('--MessageInfo onSubmit-- messageForm.value: ', this.messageForm.value); // TODO: delete this
        if (this.messageForm.invalid) {
            console.log('invalid'); // TODO: delete this
            return;
        }

        this.loading = true;
        console.log('getUserFormValues:', this.getUserFormValues()); // TODO: delete this
        if (this.isCreateMode) {
            this.createMessage();
        } else {
            this.updateMessage();
        }
    }

    private createMessage() {
        this.adminService.reqCreateMessage(this.getUserFormValues())
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Message created successfully.', true);
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            });
    }

    private updateMessage() {
        this.adminService.reqUpdateMessage(this.messageId, this.getUserFormValues())
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Message updated successfully.', true);
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            });
    }

}

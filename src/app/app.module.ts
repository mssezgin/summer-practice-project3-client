import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor } from "./helpers/error.interceptor";
import { JwtInterceptor } from "./helpers/jwt.interceptor";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserListComponent } from './components/admin-components/user-list/user-list.component';
import { UserInfoComponent } from './components/admin-components/user-info/user-info.component';
import { MessageListComponent } from './components/admin-components/message-list/message-list.component';
import { MessageInfoComponent } from './components/admin-components/message-info/message-info.component';
import { LogListComponent } from './components/admin-components/log-list/log-list.component';
import { InboxSentListComponent } from './components/user-components/inbox-sent-list/inbox-sent-list.component';
import { SeeNewMessageComponent } from './components/user-components/see-new-message/see-new-message.component';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        UserHomeComponent,
        AdminHomeComponent,
        AlertComponent,
        UserListComponent,
        UserInfoComponent,
        MessageListComponent,
        MessageInfoComponent,
        LogListComponent,
        InboxSentListComponent,
        SeeNewMessageComponent,
        MomentPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

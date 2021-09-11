import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

import { UserHomeComponent } from "./components/user-home/user-home.component";
import { InboxSentListComponent } from "./components/user-components/inbox-sent-list/inbox-sent-list.component";
import { SeeNewMessageComponent } from "./components/user-components/see-new-message/see-new-message.component";

import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { UserListComponent } from "./components/admin-components/user-list/user-list.component";
import { UserInfoComponent } from "./components/admin-components/user-info/user-info.component";
import { MessageListComponent } from "./components/admin-components/message-list/message-list.component";
import { MessageInfoComponent } from "./components/admin-components/message-info/message-info.component";
import { LogListComponent } from "./components/admin-components/log-list/log-list.component";

import { AuthGuard } from "./helpers/auth.guard";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user'
    },
    {
        path: 'user',
        component: UserHomeComponent,
        canActivate: [AuthGuard],
        children: [
            // { path: 'profile', component:  },
            { path: '', pathMatch: 'full', redirectTo: 'messages/inbox' },
            { path: 'messages/inbox', component: InboxSentListComponent },
            { path: 'messages/sent', component: InboxSentListComponent },
            { path: 'messages/new', component: SeeNewMessageComponent },
            { path: 'messages/:id', component: SeeNewMessageComponent }
        ]
    },
    {
        path: 'admin',
        component: AdminHomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'users' },
            { path: 'users', component: UserListComponent },
            { path: 'users/create', component: UserInfoComponent },
            { path: 'users/:id', component: UserInfoComponent },
            { path: 'messages', component: MessageListComponent },
            { path: 'messages/create', component: MessageInfoComponent },
            { path: 'messages/:id', component: MessageInfoComponent },
            { path: 'logs', component: LogListComponent }
        ],
        data: { role: 'admin' }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        redirectTo: 'user'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

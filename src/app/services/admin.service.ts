import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";
import { Message } from "../models/message";
import { Log } from "../models/log";
import { ListResponse } from "../models/list-response";
import { Config } from "../config/config";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    adminBaseURL = `${Config.apiURL}/admin`;

    constructor(private http: HttpClient) { }

    //// users ////

    // get all users
    reqGetAllUsers(params: any) {
        return this.http.get<ListResponse<User>>(`${this.adminBaseURL}/users`, { params: params });
    }

    // get user by userid
    reqGetUserByUserID(_id: string) {
        return this.http.get<User>(`${this.adminBaseURL}/users/${_id}`);
    }

    // create user
    reqCreateUser(user: User) {
        return this.http.post<User>(`${this.adminBaseURL}/users`, user);
    }

    // update user
    reqUpdateUser(_id: string, user: User) {
        return this.http.put<User>(`${this.adminBaseURL}/users/${_id}`, user);
    }

    // delete user
    reqDeleteUser(_id: string) {
        return this.http.delete(`${this.adminBaseURL}/users/${_id}`);
    }

    //// messages ////

    // get all messages
    reqGetAllMessages(params: any) {
        return this.http.get<ListResponse<Message>>(`${this.adminBaseURL}/messages`, { params: params });
    }

    // get message by messageid
    reqGetMessageByMessageID(_id: string) {
        return this.http.get<Message>(`${this.adminBaseURL}/messages/${_id}`);
    }

    // create message
    reqCreateMessage(message: Message) {
        return this.http.post<Message>(`${this.adminBaseURL}/messages`, message);
    }

    // update message
    reqUpdateMessage(_id: string, message: Message) {
        return this.http.put<Message>(`${this.adminBaseURL}/messages/${_id}`, message);
    }

    // delete message
    reqDeleteMessage(_id: string) {
        return this.http.delete(`${this.adminBaseURL}/messages/${_id}`);
    }

    //// logs ////

    // get all logs
    reqGetAllLogs(params: any) {
        return this.http.get<ListResponse<Log>>(`${this.adminBaseURL}/logs`, { params: params });
    }

    // get log by logid // TODO: redundant
    reqGetLogByLogID(_id: string) {
        return this.http.get<Log>(`${this.adminBaseURL}/logs/${_id}`);
    }

    // delete log
    reqDeleteLog(_id: string) {
        return this.http.delete(`${this.adminBaseURL}/logs/${_id}`);
    }

}

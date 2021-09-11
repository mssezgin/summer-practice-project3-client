import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";
import { Message } from "../models/message";
import { ListResponse } from "../models/list-response";
import { Config } from "../config/config";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userBaseURL = `${Config.apiURL}/user`;

    constructor(private http: HttpClient) { }

    // register
    reqRegister(user: User) {
        return this.http.post(`${Config.apiURL}/register`, user);
    }

    // get inbox or sent
    reqGetAllMessages(inboxOrSent: string = 'inbox', params: any) {
        return this.http.get<ListResponse<Message>>(`${this.userBaseURL}/messages/${inboxOrSent}`, { params: params });
    }

    // get message by messageid, mark as seen
    reqGetMessageByMessageID(_id: string) {
        return this.http.get<Message>(`${this.userBaseURL}/messages/${_id}`);
    }

    // create message
    reqCreateMessage(message: Message) {
        return this.http.post(`${this.userBaseURL}/messages`, message);
    }

    // delete message
    reqDeleteMessage(_id: string) {
        return this.http.delete(`${this.userBaseURL}/messages/${_id}`);
    }

    // search users
    reqSearchUsers(like: string) {
        return this.http.get(`${this.userBaseURL}/messages/search`, { params: { like: like } });
    }

}

// src/modals/newsletter.ts

/* MongoDB */
import { ObjectId } from "mongodb";

/*
In this example, we're adding a new field unsubscribeToken to the schema. 
This field will store a unique token for each subscriber, which will be used to 
identify the subscriber when they click on the unsubscribe link in the newsletter email.
When a new newsletter subscription is created, you can generate a unique token 
and save it to the unsubscribeToken field. Here's an example:
*/

export default class Newsletter {
    constructor(
        public userId: ObjectId,
        public subscriptionActive: boolean,
        public unsubscribeToken: string,
        public createdAt: Date,
        public updateAt: Date,

        public id?: ObjectId
    ) {}
};
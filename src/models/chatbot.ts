// src/modals/user.ts

/* MongoDB */
import { ObjectId } from "mongodb";

interface EachMessageProps {
    messageId: ObjectId,
    text: string, // user message text
    intent: string, // In the context of natural language processing and conversational agents like chatbots, an intent is the goal or purpose behind a user's message or input.
    entities: string, // In the context of natural language processing and conversational agents like chatbots, entities refer to specific pieces of information or data within a user's message that are relevant to understanding their intent.
    response: string,
    timestamp: Date,
};

interface EachConversationProps {
    conversation_id: ObjectId,
    timestamp: Date,
    messages: EachMessageProps[]
};

export class UserConversationsProps {
    constructor ( 
            public userId: ObjectId,
            public conversations: EachConversationProps[],
            public createdAt: Date,
            public updateAt: Date,

            public id?: ObjectId,
    ) {}
};


export class FeedBackSurveys {
    constructor ( 
        public userId: ObjectId,

        public feedbackText: string,
        public feedbackRating: 1 | 2 | 3 | 4 | 5, // rating from [1, 5]
        public timestamp: Date,

        public id?: ObjectId,
    ) {}
};


export class FeedBackInChat {
    constructor (
        public userId: ObjectId,
        public messageId: ObjectId,
    
        public feedbackText: string,
        public feedbackRating: 1 | 2 | 3 | 4 | 5, // rating from [1, 5]
        public timestamp: Date,

        public id?: ObjectId,
    ) {}
};
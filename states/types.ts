import {IMessage} from "react-native-gifted-chat";


export interface User {
    _id: string;
    name?: string;
    avatar?: string;
}

export interface Message{
    created_at:string,
    updated_at:string,
    email:string,
    id:number,
    text:string,
    is_read:boolean,
    user:string,
}
export type FetchMessages = {
    created_at:string,
    updated_at:string,
    email:string,
    id:number,
    text:string,
    is_read:boolean,
    user:string,

}


export interface ChatState {
    chatId: string | null;
    messages: Message[];
    loading: boolean;
    error: string | null;
    currentUser: User;
    setCurrentUser: (user: User) => Promise<void>;
    initializeChat: () => Promise<void>;
    fetchMessages: () => Promise<void>;
    sendMessage: (message: Omit<Message, '_id'>) => Promise<void>;
}
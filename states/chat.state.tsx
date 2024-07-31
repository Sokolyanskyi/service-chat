import {create} from 'zustand'
import axios from "axios";
import {CHAT_UID} from "@/states/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Message} from "@/states/types";
import {GiftedChat, IMessage} from "react-native-gifted-chat";

interface ChatStore {
    messages: IMessage[];
    getMessages: () => Promise<void>;
    isLoading: boolean;
    setMessages: (messages: any) => Promise<void>;
}

export const useChatStore = create<ChatStore>()((set) =>({

   messages:[],
    isLoading: false,
    getMessages: async () => {
        const token = await AsyncStorage.getItem('access_token');
        const uid = await AsyncStorage.getItem('chat_uid');

        set({ isLoading: true });
        if (token && uid) {
            try {

                const {data} = await axios.get(CHAT_UID+`${uid}/conversation`,
                    {
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )

                set({ messages:data.messages.reverse(), isLoading: false });


            } catch (err) {
                set({ isLoading: false });
                console.error(err)
            }finally {
                set({ isLoading: false });
            }
        }},
    setMessages: async (messages:any) => {
        const token = await AsyncStorage.getItem('access_token');
        const uid = await AsyncStorage.getItem('chat_uid');
        const text = {text:messages.text};



        set({ isLoading: true });
        if (token && uid) {
            try {

                const {data} = await axios.post(CHAT_UID+`${uid}/talk`,text,
                    {
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )

                const resMessage:any = {
                    id: messages._id,
                    text: data.text,
                    created_at: data.created_at,
                    user: {
                        _id: data.user,
                        name: data.user,
                        avatar: data.user,
                    },
                };

                set(state =>{
                    const newMessages = GiftedChat.append(state.messages, resMessage);
                    // console.log('New messages state:', newMessages);
                    return {
                        messages: newMessages,
                        isLoading: false
                    };
                })
            } catch (err) {
                set({ isLoading: false });
                console.error(err)
            }finally {
                set({ isLoading: false });
            }

    }}

}) )

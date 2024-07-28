import {create} from 'zustand'
import axios from "axios";
import {CHAT_UID} from "@/states/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FetchMessages, Message} from "@/states/types";

interface ChatStore {
    messages: Message[];
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
                console.log(data.messages)
                set({ messages:data.messages, isLoading: false });


            } catch (err) {
                set({ isLoading: false });
                console.error(err)
            }finally {
                set({ isLoading: false });
            }
        }},
    setMessages: async (messages) => {
        const token = await AsyncStorage.getItem('access_token');
        const uid = await AsyncStorage.getItem('chat_uid');

        set({ isLoading: true });
        if (token && uid) {
            try {

                const {data} = await axios.post(CHAT_UID+`${uid}/talk`,messages,
                    {
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                console.log(data)
                set({ messages:data.message, isLoading: false });


            } catch (err) {
                set({ isLoading: false });
                console.error(err)
            }finally {
                set({ isLoading: false });
            }

    }}

}) )

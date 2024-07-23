import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Bubble, GiftedChat, Send} from "react-native-gifted-chat";
import {IconButton} from "react-native-paper";


const Chat = () => {
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hi!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: '',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);


    const renderBubble = (props:any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const renderSend = (props:any) => {
        return (
            <Send {...props}>
                <IconButton icon="send" size={32} color="#2e64e5" />
            </Send>
        );
    };

    return (
       <GiftedChat
           messages={messages}
           onSend={messages => onSend(messages)}
           user={{
               _id: 1,
           }}
           renderBubble={renderBubble}
           renderSend={renderSend}
           placeholder="Введите сообщение..."
           alwaysShowSend
       />
    );

}

export default Chat



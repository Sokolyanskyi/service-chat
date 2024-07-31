import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import {useChatStore} from "@/states/chat.state";
import React, {useCallback, useEffect, useState} from "react";
import {GiftedChat, IMessage} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = () => {

    const [user, setUser] = useState('')
    const fetchedMessages = useChatStore(state => state.messages);
    const getMessages = useChatStore(state => state.getMessages);
    const isLoading = useChatStore(state => state.isLoading);
    const setMessages = useChatStore(state => state.setMessages);
    const getUser = async () => {
        const data: any = await AsyncStorage.getItem('user_data')
        const userData = JSON.parse(data);
        setUser(userData.name)

    }
    useEffect(() => {
        getMessages()
        getUser()
        console.log(user)
    }, [setMessages])

    const onSend = useCallback((newMessages: IMessage[] = []) => {

        const resMessage: IMessage = {
            _id: newMessages[0]._id,
            text: newMessages[0].text,
            createdAt: newMessages[0].createdAt,
            user: {
                _id: newMessages[0].user._id,
                name: 'Sok',
                avatar: "avatar",
            },
        };
        setMessages(resMessage)

    }, [setMessages]);

    if (isLoading && fetchedMessages.length === 0) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <GiftedChat
                alwaysShowSend={true}
                messages={fetchedMessages.map((message: any) => ({
                    _id: message.id,
                    text: message.text,
                    createdAt: message.created_at,
                    user: {
                        _id: 1,
                        name: message.user.name,
                        avatar: message.user.avatar,
                    },
                }))}
                onSend={messages => {
                    onSend(messages)
                }
                }
                user={{_id: 1}}
            />
        </View>


    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export default Chat



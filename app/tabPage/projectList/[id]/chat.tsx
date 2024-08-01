import {
    ActivityIndicator, Button,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import {useChatStore} from "@/states/chat.state";
import React, {useCallback, useEffect, useState} from "react";
import {Bubble, GiftedChat, IMessage} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = () => {
    const [currentUserId, setCurrentUserId] = useState(1);
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
    const switchUser = () => {
        // Переключаем между ID 1 и 2
        setCurrentUserId(prevId => (prevId === 1 ? 2 : 1));
    };

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
                user={{_id: currentUserId}}
                renderBubble={props => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: '#ddc3c3',
                                marginLeft: -50,
                            },
                            right: {
                                backgroundColor: '#5f9fd8',
                                marginRight: 0,
                                paddingRight:10
                            },
                        }}
                    />
                )}
                // containerStyle={{
                //     width: '100%', // Убедитесь, что контейнер занимает всю ширину
                // }}
                // messagesContainerStyle={{
                //     paddingHorizontal: 10, // Добавляем горизонтальный отступ для всех сообщений
                // }}
            />
            <Button title={`Switch to User ${currentUserId === 1 ? 2 : 1}`} onPress={switchUser} />
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



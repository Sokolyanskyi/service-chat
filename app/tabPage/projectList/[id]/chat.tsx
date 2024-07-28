import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import {useChatStore} from "@/states/chat.state";
import React, {useCallback, useEffect} from "react";
import {GiftedChat} from "react-native-gifted-chat";




const Chat = () => {


    const messages = useChatStore(state => state.messages);
    const getMessages = useChatStore(state => state.getMessages);
    const isLoading = useChatStore(state => state.isLoading);
    const setMessages = useChatStore(state => state.setMessages);

    useEffect(() => {
        getMessages()
        console.log(messages);
    }, [])

    const onSend = useCallback((newMessages:any = []) => {
        setMessages(newMessages);
    }, [setMessages]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages.map((message) => ({
                    _id: message.id,
                    text: message.text,
                    createdAt: message.created_at,
                    user: {
                        _id: 1,
                        name: message.user,
                    },
                }))}
                onSend={onSend}
                user={{
                    _id: 1,
                }}
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



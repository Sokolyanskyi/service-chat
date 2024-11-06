import { ActivityIndicator, View } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
import React, { useCallback, useEffect, useState } from 'react';
import { useChatStore } from '@/states/chat.state';
import { useLocalSearchParams } from 'expo-router';
import HeaderBarChat from '@/components/shared/HeaderBar/HeaderBarChat';

const Chat = () => {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [user, setUser] = useState('');
  const fetchedMessages = useChatStore((state) => state.messages);
  const getMessages = useChatStore((state) => state.getMessages);
  const isLoading = useChatStore((state) => state.isLoading);
  const [isReady, setIsReady] = useState(false);
  const setMessages = useChatStore((state) => state.setMessages);
  const { id } = useLocalSearchParams();
  useEffect(() => {
    getMessages();
  }, [setMessages]);
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const resMessage: IMessage = {
      _id: newMessages[0]._id,
      text: newMessages[0].text,
      createdAt: newMessages[0].createdAt,
      user: {
        _id: newMessages[0].user._id,
        name: 'Sok',
        avatar: 'avatar',
      },
    };
    setMessages(resMessage);
  }, []);

  // if (isLoading ) {
  //     return (
  //         <SafeAreaView style={styles.loadingContainer}>
  //             <ActivityIndicator size="large"/>
  //         </SafeAreaView>
  //     );
  // }
  const switchUser = () => {
    setCurrentUserId((prevId) => (prevId === 1 ? 2 : 1));
  };

  return (
    <View className="flex-1">
      <HeaderBarChat />
      {isReady ? (
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
          onSend={(messages) => {
            onSend(messages);
          }}
          user={{ _id: currentUserId }}
          renderBubble={(props) => (
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
                  paddingRight: 10,
                },
              }}
            />
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      )}

      {/*<Button title={`Switch to User ${currentUserId === 1 ? 2 : 1}`} onPress={switchUser} />*/}
    </View>
  );
};

export default Chat;

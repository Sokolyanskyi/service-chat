// screens/ChatScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useChatStore } from '@/states/chat.state';
import {
  fetchMessagesFromServer,
  sendMessageToServer,
} from '@/app/utils/chatUtils';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBarChat from '@/components/shared/HeaderBar/HeaderBarChat';
import { View } from 'react-native';

const ChatScreen: React.FC = () => {
  const [user, setUser] = useState({
    country: '',
    createdAt: '',
    email: '',
    id: 1,
    lastname: '',
    name: '',
    phoneNumber: '',
  });
  const { messages, addMessage, setMessages, role } = useChatStore();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const userStorageString = await AsyncStorage.getItem('user_data');
    const userStorage = JSON.parse(userStorageString);

    setUser(userStorage);
  };
  // Опрашиваем сервер для получения новых сообщений
  useEffect(() => {
    const fetchMessages = async () => {
      console.log(user);
      try {
        const serverMessages = await fetchMessagesFromServer(id);
        console.log(serverMessages);
        const sortedMessages = serverMessages.map((message) => {
          return {
            _id: message.id,
            text: message.message,
            createdAt: message.created_at,
            user: { _id: user.id, name: user.name, avatar: '' },

            image: '',
          };
        });
        console.log(sortedMessages);
        setMessages(sortedMessages.reverse());
      } catch (error) {
        console.error();
      }
    };

    fetchMessages();

    // const interval = setInterval(fetchMessages, 5000); // опрос каждые 5 секунд
    //
    // return () => clearInterval(interval); // очищаем интервал при размонтировании
  }, []);

  // Отправка нового сообщения
  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      const [message] = newMessages;

      addMessage(message);
      sendMessageToServer(id, { message: message.text }); // отправляем сообщение на сервер
    },
    [id, addMessage],
  );

  return (
    <View className="flex-1">
      <HeaderBarChat />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: user.id ? user.id : 1,
          name: 'Sok',
        }}
      />
    </View>
  );
};

export default ChatScreen;

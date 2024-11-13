import React, { useCallback, useEffect } from 'react';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { useChatStore } from '@/states/chat.state';
import {
  fetchMessagesFromServer,
  sendMessageToServer,
} from '@/app/utils/chatUtils';
import { useLocalSearchParams } from 'expo-router';
import HeaderBarChat from '@/components/shared/HeaderBar/HeaderBarChat';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import FeedbackModal from '@/components/Feedback/Feedback';
import { useProfileStore } from '@/states/profile.state';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PROJECT } from '@/states/routes';

const ChatScreen: React.FC = () => {
  const { messages, addMessage, setMessages, role } = useChatStore();
  const { profile, getProfile } = useProfileStore();
  const { id } = useLocalSearchParams();

  // Опрашиваем сервер для получения новых сообщений
  useEffect(() => {
    getProfile();
    const fetchMessages = async () => {
      try {
        const serverMessages = await fetchMessagesFromServer(id);

        const sortedMessages = serverMessages.map((message) => {
          return {
            _id: message.id,
            text: message.message,
            createdAt: message.createdAt,
            user: {
              _id: message.user.id,
              name: message.user.name,
              avatar: message.user.avatar,
            },
            image: message.image,
          };
        });

        setMessages(sortedMessages.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000); // опрос каждые 5 секунд

    return () => clearInterval(interval); // очищаем интервал при размонтировании
  }, []);

  // Выбор изображения
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      console.log(localUri);
      sendImage(localUri);
    }
  };

  // Отправка изображения
  const sendImage = async (imageUri: string) => {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);
    const formData = new FormData();
    formData.append('image', {
      photo: imageUri,
      title: 'photo.jpg',
      description: 'Photo',
    });

    try {
      const response = await axios.post(`${PROJECT}/${id}/photos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Добавление изображения в сообщение
      const newMessage = {
        _id: Math.random().toString(),
        createdAt: new Date(),
        user: { _id: profile.id, name: profile.name },
        image: response.data.imageUrl, // Предположим, что сервер возвращает URL изображения
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
    } catch (error) {
      console.error('Failed to send image:', error);
    }
  };
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        zIndex: 0,
      }}
    >
      {props.children}
    </InputToolbar>
  );
  const renderSend = (props) => (
    <Send
      {...props}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
      alwaysShowSend={true}
    >
      <MaterialIcons name="send" size={24} color="gray" />
    </Send>
  );
  // Отправка текстового сообщения
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

      {/* Кнопка для выбора изображения */}

      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: profile.id,
          name: profile.name,
        }}
        renderActions={() => (
          <TouchableOpacity
            onPress={pickImage}
            className=" justify-center items-center h-12 ml-2 pl-1"
          >
            <Fontisto name="paperclip" size={24} color="gray" />
          </TouchableOpacity>
        )}
        textInputProps={
          (styles.textInput,
          {
            placeholder: 'Type a message',
            fontSize: 16,

            fontStyle: 'normal',
          })
        }
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderMessageImage={(props) => (
          <Image
            source={{ uri: props.currentMessage?.image }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
      />

      <FeedbackModal hashedMessageId={messages[messages.length - 1]?._id} />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 4,
    paddingTop: 4,
    shadowRadius: 4,
  },
});
export default ChatScreen;

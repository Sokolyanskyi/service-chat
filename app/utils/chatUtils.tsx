// services/chatService.ts
import axios from 'axios';
import { CHAT_UID } from '@/states/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchMessagesFromServer = async (id: string) => {
  const token = await AsyncStorage.getItem('access_token');

  try {
    const response = await axios.get(`${CHAT_UID}/${id}/messages`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return response.data.messages;
  } catch (error) {
    console.error('Failed to fetch chats:', error);

    return [];
  }
};
export const sendMessageToServer = async (
  id: string,
  { message }: { message: string },
) => {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await axios.post(
      `${CHAT_UID}/${id}/send-message`,
      { message },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

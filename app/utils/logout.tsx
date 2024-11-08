import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGOUT } from '@/states/routes';
import axios from 'axios';

export const handleLogout = async (router) => {
  const token = await AsyncStorage.getItem('access_token');
  console.log(token);
  if (token) {
    try {
      const { data } = await axios.post(
        LOGOUT,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      await AsyncStorage.removeItem('access_token');
      router.replace('/welcome');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
};

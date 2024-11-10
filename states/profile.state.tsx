import { create } from 'zustand';
import axios from 'axios';
import { PROFILE } from '@/states/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Profile {
  id: number;
  name: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  country: string;
  createdAt: string;
}

type Store = {
  profile: Profile;
  isLoading: boolean;
  getProfile: () => Promise<void>;
};
export const useProfileStore = create<Store>()((set) => ({
  profile: {
    id: 0,
    name: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    country: '',
    createdAt: '',
  },
  isLoading: false,
  getProfile: async () => {
    const token = await AsyncStorage.getItem('access_token');
    set({ isLoading: true });
    if (token) {
      try {
        console.log();
        const { data } = await axios.get(PROFILE, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        console.log(data);
        set({ profile: data, isLoading: false });
        await AsyncStorage.setItem('profile', data.id);
      } catch (err) {
        set({ isLoading: false });
        console.error(err);
      } finally {
        set({ isLoading: false });
      }
    }
  },
}));

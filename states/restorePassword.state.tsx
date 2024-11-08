import { create } from 'zustand';
import axios from 'axios';
import {
  RESTOREPASSWORDEMAIL,
  RESTOREPASSWORDRESET,
  RESTOREPASSWORDVERIFY,
} from '@/states/routes';
import { Alert } from 'react-native';

interface RestorePasswordState {
  email: string;
  code: string;
  password: string;
  errors: Record<string, string> | null;
  confirmPassword: string;
  setEmail: (email: string) => Promise<void>;
  setCode: (code: string) => Promise<void>;
  setPassword: (password: string, confirmPassword: string) => Promise<void>;
  clearState: () => void;
  getErrors: () => Record<string, string> | null;
  getEmail: () => string;
  getCode: () => string;
  getPassword: () => string;
  getConfirmPassword: () => string;
}

const useRestorePasswordState = create<RestorePasswordState>((set, get) => ({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  errors: {},

  setEmail: async (email) => {
    try {
      await axios.post(RESTOREPASSWORDEMAIL, { email });
      set({ email });
      set({ errors: {} });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || 'Ошибка при отправке code';
        Alert.alert('Error', errorMessage);
        set((state) => ({
          errors: { ...state.errors, code: errorMessage },
        }));
      } else {
        Alert.alert('Ошибка', 'Не удалось отправить email'); // Обработка других ошибок
      }
    }
  },

  setCode: async (code) => {
    console.log(get().email);
    const data = {
      email: get().email,
      code,
    };
    try {
      await axios.post(RESTOREPASSWORDVERIFY, { ...data });
      set({ code });
      set({ errors: {} });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || 'Ошибка при отправке code';
        Alert.alert('Ошибка', errorMessage);
        set((state) => ({
          errors: { ...state.errors, code: errorMessage },
        }));
      } else {
        Alert.alert('Ошибка', 'Не удалось отправить email'); // Обработка других ошибок
      }
    }
  },

  setPassword: async (password, confirmPassword) => {
    const data = {
      email: get().email,
      code: get().code,
      password,
      password_confirmation: confirmPassword,
    };
    try {
      await axios.post(RESTOREPASSWORDRESET, { ...data });
      console.log(
        get().email,
        get().code,
        get().password,
        get().confirmPassword,
      );
      set({ password, confirmPassword });
      set({ errors: {} });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || 'Ошибка при отправке пароля';
        Alert.alert('Ошибка', errorMessage);
        set((state) => ({
          errors: {
            ...state.errors,
            password: errorMessage,
            confirmPassword: errorMessage,
          },
        }));
      }
    }
  },

  clearState: () => {
    console.log(get().email, get().code, get().password, get().confirmPassword);
    set({
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      errors: {},
    });
  },

  getEmail: () => get().email,
  getCode: () => get().code,
  getPassword: () => get().password,
  getConfirmPassword: () => get().confirmPassword,
  getErrors: () => get().errors,
}));

export default useRestorePasswordState;

import React from 'react';

import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputController from '@/components/shared/input/input';
import Button from '@/components/shared/button/Button';
import useRestorePasswordState from '@/states/restorePassword.state';
import { router } from 'expo-router';

const RestorePassword = () => {
  const { setEmail, getErrors } = useRestorePasswordState();

  const restorePasswordFormSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(restorePasswordFormSchema),
    mode: 'onChange',
  });
  const restorePassword = async (data: { email: string }) => {
    try {
      await setEmail(data.email);

      const serverErrors = getErrors();
      if (serverErrors?.code) {
        setError('email', { message: serverErrors.code });

        return; // Не переходим на другую страницу
      }

      router.replace('/auth/restorePassword/restoreCode');
    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      Alert.alert('Ошибка', 'Не удалось отправить email');
    }
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold">Restore Password</Text>
      <View className="w-[300px] mt-8">
        <InputController
          errors={errors}
          name="email"
          control={control}
          placeholder={'Please enter email'}
          props={{
            keyboardType: 'email-address',
          }}
        />

        <Button
          text={'Restore password'}
          onPress={handleSubmit(restorePassword)}
          className="animate-pulse"
        />
      </View>
    </SafeAreaView>
  );
};

export default RestorePassword;

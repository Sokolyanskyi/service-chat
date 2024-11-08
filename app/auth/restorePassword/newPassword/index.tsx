import * as yup from 'yup';

import { StatusBar, Text, View } from 'react-native';
import React, { useState } from 'react';

import Button from '@/components/shared/button/Button';
import InputController from '@/components/shared/input/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import useRestorePasswordState from '@/states/restorePassword.state';

const NewPassword = () => {
  const { setPassword, clearState, getErrors } = useRestorePasswordState();
  const router = useRouter();
  const [optionName, setOptionName] = useState('');
  console.log(optionName);

  const newPasswordFormSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[a-z]/,
        'Пароль должен содержать хотя бы одну букву в нижнем регистре',
      )
      .matches(
        /[A-Z]/,
        'Пароль должен содержать хотя бы одну букву в верхнем регистре',
      )
      .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[a-z]/,
        'Пароль должен содержать хотя бы одну букву в нижнем регистре',
      )
      .matches(
        /[A-Z]/,
        'Пароль должен содержать хотя бы одну букву в верхнем регистре',
      )
      .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(newPasswordFormSchema),
    mode: 'onChange',
  });

  const register = async (data: {
    password: string;
    password_confirmation: string;
  }) => {
    try {
      await setPassword(data.password, data.password_confirmation);
      const serverErrors = getErrors();
      if (serverErrors?.code) {
        setError('password', { message: serverErrors.code });
        setError('password_confirmation', { message: serverErrors.code });
        return;
      }

      clearState();
      router.replace('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar barStyle="dark-content" />

      <View className=" mt-2">
        <View className="justify-center items-center  ">
          <Text className="text-4xl mb-10 mt-5 font-bold color-black">
            Set new password
          </Text>

          <View className="w-[300px] mb-20">
            <InputController
              errors={errors}
              name="password"
              placeholder={'Password'}
              control={control}
              //   isPassword={true}
            />
            <InputController
              errors={errors}
              name="password_confirmation"
              placeholder={'Password confirm'}
              control={control}
              //   isPassword={true}
            />

            <Button text={'Set password'} onPress={handleSubmit(register)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;

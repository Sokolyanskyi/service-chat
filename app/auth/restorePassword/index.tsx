import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputController from '@/components/shared/input/input';
import Button from '@/components/shared/button/Button';
import { FontSize } from '@/components/shared/tokens';
import { router } from 'expo-router';

const RestorePassword = () => {
  const restorePasswordFormSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(restorePasswordFormSchema),
    mode: 'onChange',
  });
  const restorePassword = async (data) => {
    console.log(data);
    router.replace('/auth/restorePassword/restoreCode');
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    justifyContent: 'center',
  },
  text: {
    fontSize: FontSize.fs30,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { alignSelf: 'stretch' },
});

export default RestorePassword;

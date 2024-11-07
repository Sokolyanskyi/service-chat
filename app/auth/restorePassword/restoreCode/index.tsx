import React from 'react';

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputController from '@/components/shared/input/input';
import Button from '@/components/shared/button/Button';
import { router } from 'expo-router';

const RestorePasswordCode = () => {
  const restorePasswordFormSchema = yup.object().shape({
    code: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Code must be 6 digits')
      .required('Code is required'),
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
    router.replace('/auth/restorePassword/newPassword');
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold">Restore password code</Text>
      <View className="w-[300px] mt-8">
        <InputController
          errors={errors}
          name="code"
          control={control}
          placeholder={'Please enter code'}
          props={{
            keyboardType: 'email-address',
          }}
        />

        <Button
          text={'Send code'}
          onPress={handleSubmit(restorePassword)}
          className="animate-pulse"
        />
      </View>
    </SafeAreaView>
  );
};

export default RestorePasswordCode;

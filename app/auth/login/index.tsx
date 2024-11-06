import * as yup from 'yup';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FieldValues, useForm } from 'react-hook-form';
import { FontSize } from '@/components/shared/tokens';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/shared/button/Button';
import InputController from '@/components/shared/input/input';
import { LOGIN } from '@/states/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema), mode: 'onChange' });
  /* eslint-disable */
  const handlePress = () => {
    router.push('/auth/registration');
  };

  const alert = (text: string) => {
    Alert.alert('Error', `${text}`, [
      {
        text: 'Close',
        style: 'cancel',
      },
    ]);
  };

  const login = async (data: FieldValues) => {
    try {
      const res = await axios.post(LOGIN, {
        email: data.email.toLowerCase(),
        password: data.password,
      });
      await AsyncStorage.setItem('access_token', res.data.Bearer.accessToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(res.data.data));
      router.replace('/projects/projectList');
      console.log(res.data.data);
    } catch (err: any) {
      alert(JSON.stringify(err.response.data));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View className="mb-10">
          <Image
            source={require('../../../assets/images/Hisense-Logo.png')}
            className="w-[400px] h-[80px]"
          />
        </View>
        <Text className="text-4xl text-center mb-6 font-bold color-emerald-600">
          Login
        </Text>
        <View style={styles.form}>
          <InputController
            errors={errors}
            name="email"
            control={control}
            placeholder={'Please enter email'}
            props={{
              keyboardType: 'email-address',
            }}
          />
          <InputController
            errors={errors}
            name="password"
            control={control}
            placeholder={'Please enter password'}
            isPassword={true}
          />
          <Button
            text={'Login'}
            onPress={handleSubmit(login)}
            className="animate-pulse"
          />
        </View>
        <View style={styles.singup}>
          <Text>If you dont have account please </Text>
          <TouchableOpacity
            onPress={handlePress}
            className="mt-5 border-2 border-[#00b3ac] px-2 #00b3ac rounded-md justify-center items-center"
          >
            <Text className="text-[#00b3ac] text-lg font-bold">Sing Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.singup}>
          <Text>Forgot your password?</Text>
          <Text>Click 'Restore Password' to reset it.</Text>
          <TouchableOpacity
            onPress={() => router.push('/auth/restorePassword')}
            className="mt-5 border-2 border-[#00b3ac] px-2 #00b3ac rounded-md justify-center items-center"
          >
            <Text className="text-[#00b3ac] text-lg font-bold">
              Restore Password
            </Text>
          </TouchableOpacity>
        </View>
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
  singup: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
});
export default Login;

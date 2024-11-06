import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomePage = () => {
  const handlePress = () => {
    router.replace('/auth/login');
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Ошибка при проверке токена:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <ActivityIndicator />;
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href="/projects/projectList" />;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar barStyle="dark-content" />
      <View className="mb-10">
        <Image
          source={require('../../assets/images/Hisense-Logo.png')}
          className="w-[400px] h-[80px]"
        />
      </View>
      <View className="mb-5">
        <Text className="text-5xl font-bold text-gray-700">Welcome</Text>
      </View>
      <View className="mb-5">
        <Text className="text-xl">If you have account please </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handlePress}
          className="justify-center items-center border-[#00b3ac] rounded-md border-2 "
        >
          <Text className="text-lg font-bold text-[#00b3ac] px-2 animate-pulse">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;

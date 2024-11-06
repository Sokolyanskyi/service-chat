import { StatusBar, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/shared/button/Button';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    router.replace('/welcome');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar barStyle="dark-content" />
      <Text className="text-4xl">You have successfully </Text>
      <Text className="text-3xl">logged in</Text>
      {/*<Celebration/>*/}
      <View>
        <Button
          text="Project list/ask"
          onPress={() => router.push('/projects/projectList')}
          className="w-[300px]"
        ></Button>
        <Button
          text="Add project"
          onPress={() => router.push('/projects/addProject')}
          className="w-[300px]"
        ></Button>
        <Button
          text="LogOut"
          onPress={handleLogout}
          className="w-[300px]"
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default Index;

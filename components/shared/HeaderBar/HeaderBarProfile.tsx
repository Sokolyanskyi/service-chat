import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProjectsStore } from '@/states/projects.state';
import { handleLogout } from '@/app/utils/logout';

export default function HeaderBarProfile({ name }: { name: string }) {
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);
  const [route, setRoute] = useState('');

  const isLoading = useProjectsStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView className="flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300 w-full z-50">
      {/* Бургер-меню слева */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={toggleMenu} className="p-2 mr-2">
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-bold text-2xl">
          {route?.replace(/-/g, ' ')}
          {name}
        </Text>
      </View>

      {/* Иконки справа */}
      <View className="flex-row mr-5"></View>

      {/* Меню профиля */}
      {menuVisible && (
        <View className="absolute top-32 left-5 right-0 bg-white rounded-lg p-4 shadow-lg w-1/2">
          <TouchableOpacity
            onPress={() => router.replace(`/projects/projectList`)}
          >
            <Text className="py-2 text-lg ">Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout(router)}>
            <Text className="py-2 text-lg text-red-500">Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

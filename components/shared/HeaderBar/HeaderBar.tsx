import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { usePathname, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HeaderBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [route, setRoute] = useState('');
  const currentRoute = pathname?.split('/').pop();
  console.log(pathname.split('/').pop());
  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    router.replace('/welcome');
  };
  useEffect(() => {
    if (currentRoute === 'projectList') {
      setRoute('Project list');
    }
  }, []);
  useEffect(() => {
    if (currentRoute === 'editProject') {
      setRoute('Edit project');
    }
  }, []);
  useEffect(() => {
    if (currentRoute === 'addProject') {
      setRoute('Add project');
    }
  }, []);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const id = pathname.split('/')[3];
  console.log(id);

  return (
    <SafeAreaView className="flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300 w-full z-50">
      {/* Бургер-меню слева */}
      <TouchableOpacity onPress={toggleMenu} className="p-2">
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <Text className="font-bold text-2xl">{route?.replace(/-/g, ' ')}</Text>
      {/* Иконки справа */}
      <View className="flex-row mr-5"></View>

      {/* Меню профиля */}
      {menuVisible && (
        <View className="absolute top-32 left-5 right-0 bg-white rounded-lg p-4 shadow-lg w-1/2">
          <Text className="py-2 text-lg">Profile Information</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text className="py-2 text-lg text-red-500">Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

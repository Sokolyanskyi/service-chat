import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { usePathname, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleLogout } from '@/app/utils/logout';

export default function HeaderBarProjectList() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [route, setRoute] = useState('');
  const currentRoute = pathname?.split('/').pop();
  console.log(pathname.split('/').pop());

  const closeMenu = () => {
    setMenuVisible(false);
  };
  useEffect(() => {
    if (currentRoute === 'projectList') {
      setRoute('Project list');
    }
  }, []);
  useEffect(() => {
    if (currentRoute === 'chat') {
      setRoute('Chat');
    }
  }, []);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const id = pathname.split('/')[3];
  console.log(id);

  if (currentRoute === 'projectList') {
    return (
      <SafeAreaView className="flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300 w-full z-50">
        {/* Бургер-меню слева */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={toggleMenu} className="p-2 mr-2">
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-bold text-2xl">
            {route?.replace(/-/g, ' ')}
          </Text>
        </View>

        {/* Иконки справа */}
        <View className="flex-row mr-5">
          <TouchableOpacity onPress={() => router.push('/projects/addProject')}>
            <MaterialIcons name="add-box" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Меню профиля */}
        {menuVisible && (
          <View className="absolute top-32 left-5 right-0 bg-white rounded-lg p-4 shadow-lg w-1/2 ">
            <TouchableOpacity onPress={() => router.replace(`/profile`)}>
              <Text className="py-2 text-lg">Profile Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace(`/projects/projectList`)}
            ></TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout(router)}>
              <Text className="py-2 text-lg text-red-500">Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
  if (currentRoute === 'chat') {
    return (
      <SafeAreaView className="flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300 w-full z-50">
        {/* Бургер-меню слева */}
        <TouchableOpacity onPress={toggleMenu} className="p-2">
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-bold text-2xl">{route?.replace(/-/g, ' ')}</Text>
        {/* Иконки справа */}
        <View className="flex-row mr-5">
          <TouchableOpacity onPress={() => router.push('/projects/addProject')}>
            <MaterialIcons name="add-box" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push(`/projects/projectList/${id}/editProject`)
            }
            className="ml-4"
          >
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Меню профиля */}
        {menuVisible && (
          <TouchableWithoutFeedback
            onPress={closeMenu}
            className="flex-1 absolute"
          >
            <View className="absolute inset-0 bg-transparent">
              <View className="absolute top-20 left-5 right-0 bg-white rounded-lg p-4 shadow-lg w-1/2 ">
                <Text className="py-2 text-lg">Profile Information</Text>
                <TouchableOpacity onPress={handleLogout}>
                  <Text className="py-2 text-lg text-red-500">Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </SafeAreaView>
    );
  }
}

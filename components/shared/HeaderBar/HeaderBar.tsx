import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProjectStore } from '@/states/project.state';
import { useProjectsStore } from '@/states/projects.state';

export default function HeaderBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [route, setRoute] = useState('');
  const currentRoute = pathname?.split('/').pop();
  console.log(pathname.split('/').pop());
  const project = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);
  const isLoading = useProjectsStore((state) => state.isLoading);

  const { id } = useLocalSearchParams();
  useEffect(() => {
    if (id) getProject(id);
  }, []);
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
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
  const idPath = pathname.split('/')[3];
  console.log(id);

  return (
    <SafeAreaView className="flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300 w-full z-50">
      {/* Бургер-меню слева */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={toggleMenu} className="p-2 mr-2">
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-bold text-2xl">
          {route?.replace(/-/g, ' ')}/{project?.name}
        </Text>
      </View>

      {/* Иконки справа */}
      <View className="flex-row mr-5"></View>

      {/* Меню профиля */}
      {menuVisible && (
        <View className="absolute top-32 left-5 right-0 bg-white rounded-lg p-4 shadow-lg w-1/2">
          <TouchableOpacity onPress={() => router.replace(`/profile`)}>
            <Text className="py-2 text-lg">Profile Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace(`/projects/projectList`)}
          >
            <Text className="py-2 text-lg ">Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text className="py-2 text-lg text-red-500">Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

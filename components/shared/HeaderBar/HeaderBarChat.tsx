import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProjectStore } from '@/states/project.state';
import { useProjectsStore } from '@/states/projects.state';
import { handleLogout } from '@/app/utils/logout';

export default function HeaderBarChat() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [route, setRoute] = useState('');
  const currentRoute = pathname?.split('/').pop();
  console.log(pathname.split('/').pop());
  const project = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);
  const isLoading = useProjectsStore((state) => state.isLoading);
  const deleteProject = useProjectsStore((state) => state.deleteProject);
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
  const handleDeleteProject = (projectId) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProject(projectId);
            router.replace(`/projects/projectList`);
          },
        },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    if (currentRoute === 'chat') {
      setRoute('Chat');
    }
  }, []);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const idPath = pathname.split('/')[3];
  console.log(id);

  if (currentRoute === 'chat') {
    return (
      <SafeAreaView className="flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300 w-full z-50">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={toggleMenu} className="p-2 mr-2">
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-bold text-2xl">
            {route?.replace(/-/g, ' ')}/{project?.name}
          </Text>
        </View>

        <View className="flex-row mr-5">
          <TouchableOpacity
            onPress={() => {
              handleDeleteProject(idPath);
            }}
            className="mr-4"
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push(`/projects/projectList/${idPath}/viewProject`)
            }
            className="ml-4"
          >
            <MaterialIcons name="article" size={24} color="black" />
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
}

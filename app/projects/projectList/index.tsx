import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useProjectsStore } from '@/states/projects.state';
import { useRouter } from 'expo-router';
import HeaderBarProjectList from '@/components/shared/HeaderBar/HeaderBarProjectList';

interface Project {
  id: number;
  name: string;
  city: string;
  address: string;
  commissioningCompletionDate: string;
  quantityOfSystem: number;
  quantityOfOutdoorUnit: number;
}

const ProjectList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const projects = useProjectsStore((state) => state.projects);
  const getProjects = useProjectsStore((state) => state.getProjects);
  const isLoading = useProjectsStore((state) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    setRefreshing(true);
    getProjects();
    setRefreshing(false);
  }, [getProjects]);

  const onRefresh = useCallback(() => {
    getProjects();
  }, [getProjects]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (projects.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <View>
          <Text>No projects found.</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Project }) => (
    <TouchableOpacity
      className="items-start justify-center p-2 bg-[#00b3ac] border-2 border-gray-300 w-80 mb-2 rounded-xl ml-2"
      onPress={() => router.push(`/projects/projectList/${item.id}/chat`)}
    >
      <Text className="text-xl text-white font-bold ml-2">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-center items-center ">
      <HeaderBarProjectList />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="w-full z-0"
      >
        <StatusBar barStyle="dark-content" />
        <View className="items-start justify-center mb-16 mt-5 z-0">
          <FlatList
            scrollEnabled={false}
            data={projects}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#9Bd35A', '#689F38']}
                tintColor="#689F38" // Цвет для iOS
              />
            }
            // keyExtractor={(item:Project) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectList;

import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useProjectStore } from '@/states/project.state';
import { useProjectsStore } from '@/states/projects.state';
import HeaderBarProjectView from '@/components/shared/HeaderBar/HeaderBarProjectView';

const ProjectPage = () => {
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

  console.log(project.name);
  return (
    <View className="flex-1 ">
      <HeaderBarProjectView name={project.name} />
      <StatusBar barStyle="dark-content" />

      <View className="ml-4 gap-3   mt-8">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">id:</Text>
          <Text className="text-xl">{project.id}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">name:</Text>
          <Text className="text-xl">{project.name}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">city:</Text>
          <Text className="text-xl">{project.city}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">address:</Text>
          <Text className="text-xl">{project.address}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">
            commissioning Completion Date:
          </Text>
          <Text className="text-xl">{project.commissioningCompletionDate}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">quantityOfSystem:</Text>
          <Text className="text-xl">{project.quantityOfSystem}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">quantityOfOutdoorUnit:</Text>
          <Text className="text-xl">{project.quantityOfOutdoorUnit}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProjectPage;

import { ActivityIndicator, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Button from '@/components/shared/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProjectStore } from '@/states/project.state';
import { useProjectsStore } from '@/states/projects.state';

const ProjectPage = () => {
  const project = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);
  const isLoading = useProjectsStore((state) => state.isLoading);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  console.log(id);
  useEffect(() => {
    if (id) getProject(id);
    console.log(project);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="justify-center items-center gap-2">
        <Text className="text-4xl">{project.name}</Text>
        <Button
          text={'Edit Project'}
          onPress={() => router.push(`/projects/projectList/${id}/edit`)}
          className="w-[300px]"
        />
        <Button
          text={'View Project'}
          onPress={() => router.push(`/projects/projectList/${id}/view`)}
          className="w-[300px]"
        />
        <Button
          text={'Chat'}
          onPress={() => router.push(`/projects/projectList/${id}/chat`)}
          className="w-[300px]"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProjectPage;

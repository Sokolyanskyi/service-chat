import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import React, { useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useProjectStore } from "@/states/project.state";
import { useProjectsStore } from "@/states/projects.state";

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

  console.log(id);
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar barStyle="dark-content" />
      <Text className="text-4xl mb-4">{project.name}</Text>
      <View className="gap-3 justify-center items-center">
        <View className="justify-center items-center">
          <Text className="text-2xl">id:</Text>
          <Text>{project.id}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-2xl">name:</Text>
          <Text>{project.name}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-2xl">city:</Text>
          <Text>{project.city}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-2xl">address:</Text>
          <Text>{project.address}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-2xl">commissioning Completion Date:</Text>
          <Text>{project.commissioningCompletionDate}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-2xl">quantityOfSystem:</Text>
          <Text>{project.quantityOfSystem}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-2xl">quantityOfOutdoorUnit:</Text>
          <Text>{project.quantityOfOutdoorUnit}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProjectPage;

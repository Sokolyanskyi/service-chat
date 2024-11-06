import { StatusBar, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProjectPage = () => {
  const { id } = useLocalSearchParams();

  console.log(id);
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar barStyle="dark-content" />
      <View className="justify-center items-center gap-2">
        <Text className="text-4xl justify-center">Edit</Text>
        <Text className="text-3xl justify-center">{id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProjectPage;

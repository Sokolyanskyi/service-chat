import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Button from "@/components/shared/button/Button";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProjectsStore } from "@/states/projects.state";
import { useRouter } from "expo-router";

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
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  if (projects.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <View>
          <Text>No projects found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: Project }) => (
    <TouchableOpacity className="items-center justify-center gap-3">
      <Button
        text={item.name}
        className="w-[300px]"
        onPress={() => router.push(`/tabPage/projectList/${item.id}/`)}
      >
        <Text className="text-xl text-white ">{item.name}</Text>
      </Button>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 justify-center items-center ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="w-full "
      >
        <StatusBar barStyle="dark-content" />
        <View className="items-center justify-center mb-16">
          <Text className="text-4xl mb-2">Project List</Text>
          <FlatList
            scrollEnabled={false}
            data={projects}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#9Bd35A", "#689F38"]}
                tintColor="#689F38" // Цвет для iOS
              />
            }
            // keyExtractor={(item:Project) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectList;

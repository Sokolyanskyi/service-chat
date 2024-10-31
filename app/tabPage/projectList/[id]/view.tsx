import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FontSize, Gaps } from "@/components/shared/tokens";
import { useLocalSearchParams } from "expo-router";
import { useProjectStore } from "@/states/project.state";
import { useProjectsStore } from "@/states/projects.state";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  console.log(id);
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={styles.title}>{project.name}</Text>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.text}>id:</Text>
          <Text>{project.id}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>name:</Text>
          <Text>{project.name}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>city:</Text>
          <Text>{project.city}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>address:</Text>
          <Text>{project.address}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>commissioning Completion Date:</Text>
          <Text>{project.commissioningCompletionDate}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>quantityOfSystem:</Text>
          <Text>{project.quantityOfSystem}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>quantityOfOutdoorUnit:</Text>
          <Text>{project.quantityOfOutdoorUnit}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    justifyContent: "center",
  },
  title: {
    fontSize: FontSize.fs30,
    marginBottom: 30,
  },
  info: { alignItems: "center", justifyContent: "center" },

  text: {
    fontSize: FontSize.fs18,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: Gaps.g16,
  },
  form: { alignSelf: "stretch", gap: Gaps.g16 },
});
export default ProjectPage;

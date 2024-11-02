import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { FontSize, Gaps } from "@/components/shared/tokens";
import { Link, router } from "expo-router";
import { Colors } from "@/constants/Colors";

const StartPage = () => {
  const handlePress = () => {
    router.replace("/tabs");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.text}>Welcome</Text>
      </View>
      <View>
        <Text>If you have account please </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={{
              color: Colors.accentColor,
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 10,
              borderColor: Colors.accentColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 3,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
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
  text: {
    fontSize: FontSize.fs30,
  },
  content: {
    marginBottom: 40,
  },
  form: { alignSelf: "stretch", gap: Gaps.g16 },
});
export default StartPage;

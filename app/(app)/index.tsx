import { FontSize, Gaps } from "@/components/shared/tokens";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { router } from "expo-router";

const StartPage = () => {
  const handlePress = () => {
    router.replace("/tabs");
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar barStyle="dark-content" />
      <View className="mb-5">
        <Text className="text-5xl">Welcome</Text>
      </View>
      <View className="mb-5">
        <Text className="text-xl">If you have account please </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-lg font-bold mt-2 border-2 text-[#00b3ac] border-[#00b3ac] rounded-md px-2 py-1">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartPage;

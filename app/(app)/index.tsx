import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
    Image
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
        <View className='w-[400px] mb-5 justify-center items-center'>
            <Image source={require('../../assets/images/logo.png')} className="w-[300px] h-[48px]  "/>
        </View>
      <View className="mb-5">
        <Text className="text-5xl">Welcome</Text>
      </View>
      <View className="mb-5">
        <Text className="text-xl">If you have account please </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handlePress}
          className="justify-center items-center border-[#00b3ac] rounded-md border-2"
        >
          <Text className="text-lg font-bold text-[#00b3ac] px-2">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartPage;

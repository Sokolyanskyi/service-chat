import { Slot, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <ActivityIndicator />;
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isAuthenticated ? <Redirect href="/tabPage" /> : <Slot />}
    </SafeAreaView>
  );
}

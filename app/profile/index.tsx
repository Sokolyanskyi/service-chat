import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileStore } from '@/states/profile.state';
import HeaderBarProfile from '@/components/shared/HeaderBar/HeaderBarProfile';

const ProfilePage = () => {
  const profile = useProfileStore((state) => state.profile);
  const getProfile = useProfileStore((state) => state.getProfile);
  const isLoading = useProfileStore((state) => state.isLoading);

  useEffect(() => {
    getProfile();
  }, []);
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  console.log(profile);
  return (
    <View className="flex-1 ">
      <HeaderBarProfile name={profile.name} />
      <StatusBar barStyle="dark-content" />

      <View className="ml-4 gap-3   mt-8">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Id: </Text>
          <Text className="text-xl">{profile.id}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Name: </Text>
          <Text className="text-xl">{profile.name}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Lastname: </Text>
          <Text className="text-xl">{profile.lastname}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Phone number: </Text>
          <Text className="text-xl">{profile.phoneNumber}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Email: </Text>
          <Text className="text-xl">{profile.email}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Country: </Text>
          <Text className="text-xl">{profile.country}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold">Created at: </Text>
          <Text className="text-xl">
            {new Date(profile.createdAt).toDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;

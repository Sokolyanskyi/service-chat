import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="font-bold text-4xl">Profile</Text>
      <TouchableOpacity onPress={() => router.replace(`/projects/projectList`)}>
        <Text className="py-2 text-lg ">Projects</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

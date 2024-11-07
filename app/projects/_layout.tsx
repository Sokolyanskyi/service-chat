import React from 'react';

import { Stack } from 'expo-router';

const NextLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="addProject" options={{ headerShown: false }} />
      <Stack.Screen name="projectList/index" options={{ headerShown: false }} />
      <Stack.Screen name="projectList/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default NextLayout;

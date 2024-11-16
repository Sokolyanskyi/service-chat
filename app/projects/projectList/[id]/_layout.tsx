import React from 'react';

import { Stack } from 'expo-router';

const ProjectLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="project/index" options={{ headerShown: false }} />
      <Stack.Screen name="editProject" options={{ headerShown: false }} />
      <Stack.Screen name="viewProject/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProjectLayout;

import React from 'react';

import { Stack } from 'expo-router';

const ProjectLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="addPhoto/index"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true, // Allows swipe down to close
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
};

export default ProjectLayout;

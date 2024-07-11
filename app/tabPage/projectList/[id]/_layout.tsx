import React from 'react';

import {Stack} from "expo-router";
const ProjectLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="edit" options={{headerShown:false}}/>
            <Stack.Screen name="view" options={{headerShown:false}}/>
        </Stack>
    );
};

export default ProjectLayout;
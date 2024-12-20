import React from 'react';
import {Stack} from "expo-router";


const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="registration" options={{ headerShown: false }} />
            <Stack.Screen name="restorePassword" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AuthLayout;
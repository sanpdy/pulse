import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function FlowLayout() {
  return (
    <>
      <StatusBar style="light" hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="breathing" />
        <Stack.Screen name="soundscapes" />
        <Stack.Screen name="quotes" />
        <Stack.Screen name="chat" />
      </Stack>
    </>
  );
} 
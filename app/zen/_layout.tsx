import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ZenLayout() {
  return (
    <>
      <StatusBar style="light" hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="meditations" />
        <Stack.Screen name="breathing" />
        <Stack.Screen name="quotes" />
        <Stack.Screen name="gratitude" />
        <Stack.Screen name="soundscapes" />
        <Stack.Screen name="challenges" />
      </Stack>
    </>
  );
} 
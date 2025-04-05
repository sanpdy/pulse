// app/(tabs)/grind/_layout.tsx
import { Slot } from 'expo-router';
import { View } from 'react-native';
import React, { useEffect } from 'react';

export default function GrindLayout() {
  useEffect(() => {
    // optional logic (e.g., scheduling notifications)
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}

import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen
        name="zen"
        options={{
          title: 'ZEN',
          tabBarIcon: () => <Text>🧘‍♂️</Text>,
        }}
      />
      <Tabs.Screen
        name="grind"
        options={{
          title: 'GRIND',
          tabBarIcon: () => <Text>🏋️</Text>,
        }}
      />
    </Tabs>
  );
}

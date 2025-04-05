import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarStyle: {
          backgroundColor: route.name === 'flow' ? '#2A3A2C' : '#330000',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="flow"
        options={{
          title: 'Flow',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="leaf" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="forge"
        options={{
          title: 'Forge',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="fire" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

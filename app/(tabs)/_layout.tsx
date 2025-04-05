import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        height: 60,
        paddingBottom: 8,
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#666666',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    }}>
      <Tabs.Screen
        name="zen"
        options={{
          title: 'ZEN',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🧘‍♂️</Text>,
        }}
      />
      <Tabs.Screen
        name="grind"
        options={{
          title: 'GRIND',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏋️</Text>,
        }}
      />
    </Tabs>
  );
}

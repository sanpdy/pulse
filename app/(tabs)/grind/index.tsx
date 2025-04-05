// app/(tabs)/grind/index.tsx
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function GrindScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🏋️ GRIND</Text>

      <Button
        title="Go to Tasks"
        onPress={() => router.push('/(tabs)/grind/tasks')}
      />
    </View>
  );
}

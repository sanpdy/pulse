import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const menuItems = [
  {
    id: 'breathing',
    title: 'Breathing Visualizer',
    description: '4-7-8, Box, Custom patterns',
    emoji: '🌬️',
  },
  {
    id: 'soundscapes',
    title: 'Soothing Soundscapes',
    description: 'Rain, Wind, Forest, Lo-fi',
    emoji: '🎵',
  },
  {
    id: 'quotes',
    title: 'Daily Zen Quote',
    description: 'Daily wisdom and affirmations',
    emoji: '📜',
  },
  {
    id: 'challenges',
    title: 'Zen Challenges',
    description: '3-day calm streaks, silent hour',
    emoji: '🏆',
  },
];

export default function ZenScreen() {
  const handlePress = (id: string) => {
    router.push(`/zen/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" hidden />
      <LinearGradient
        colors={['#000000', '#001F0F']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>🧘‍♂️ Zen</Text>
        <Text style={styles.subtitle}>Find your peace and presence</Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handlePress(item.id)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 5,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    letterSpacing: 0.2,
  },
  menuContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 0.5,
    borderColor: '#00FF9D',
  },
  emoji: {
    fontSize: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  menuDescription: {
    fontSize: 14,
    color: '#999999',
    letterSpacing: 0.2,
  },
});

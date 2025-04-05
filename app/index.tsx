import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pulse</Text>
      <Text style={styles.subtitle}>Choose your path</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.option, styles.zenOption]} 
          onPress={() => router.push('/(tabs)/zen')}
        >
          <Text style={styles.optionEmoji}>🧘‍♂️</Text>
          <Text style={styles.optionText}>ZEN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, styles.grindOption]} 
          onPress={() => router.push('/(tabs)/grind')}
        >
          <Text style={styles.optionEmoji}>🏋️</Text>
          <Text style={styles.optionText}>GRIND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  option: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zenOption: {
    backgroundColor: '#E8F5E9',
  },
  grindOption: {
    backgroundColor: '#FFEBEE',
  },
  optionEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});



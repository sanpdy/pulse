import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const quote = {
  text: "Peace is not the absence of conflict, but the ability to cope with it.",
  author: "Unknown",
};

export default function QuotesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" hidden />
      <LinearGradient
        colors={['#000000', '#001F0F']}
        style={StyleSheet.absoluteFill}
      />
      
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.authorText}>— {quote.author}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#00FF9D',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  authorText: {
    fontSize: 16,
    color: '#999999',
    fontStyle: 'italic',
  },
}); 
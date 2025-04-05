// QuotesScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const quotes = [
  {
    text: "Peace is not the absence of conflict, but the ability to cope with it.",
    author: "Unknown"
  },
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "In the midst of movement and chaos, keep stillness inside of you.",
    author: "Deepak Chopra"
  },
  {
    text: "The quieter you become, the more you can hear.",
    author: "Ram Dass"
  },
  {
    text: "Wherever you are, be there totally.",
    author: "Eckhart Tolle"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Be the change you wish to see in the world.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha"
  },
  {
    text: "When you realize nothing is lacking, the whole world belongs to you.",
    author: "Lao Tzu"
  }
];

export default function QuotesScreen() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const startSpinAnimation = () => {
    setIsRefreshing(true);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
      setIsRefreshing(false);
    });
  };

  const getNewQuote = async (forceNew: boolean = false) => {
    try {
      const lastQuoteDate = await AsyncStorage.getItem('lastQuoteDate');
      const lastQuoteIndex = await AsyncStorage.getItem('lastQuoteIndex');
      const today = new Date().toDateString();

      if (!forceNew && lastQuoteDate === today && lastQuoteIndex) {
        // Use the same quote if it's the same day
        setCurrentQuote(quotes[parseInt(lastQuoteIndex)]);
      } else {
        // Get a new random quote
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex.toString() === lastQuoteIndex); // Ensure we don't show the same quote twice in a row

        if (!forceNew) {
          await AsyncStorage.setItem('lastQuoteDate', today);
          await AsyncStorage.setItem('lastQuoteIndex', newIndex.toString());
        }
        setCurrentQuote(quotes[newIndex]);
      }
    } catch (error) {
      console.error('Error getting quote:', error);
    }
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  const handleRefresh = async () => {
    startSpinAnimation();
    await getNewQuote(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <Header title="Quotes" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.quoteContainer}>
          <View style={styles.quoteContent}>
            <Text style={styles.quoteText}>{currentQuote.text}</Text>
            <Text style={styles.authorText}>— {currentQuote.author}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
          disabled={isRefreshing}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialIcons 
              name="refresh" 
              size={24} 
              color="#4CAF50"
            />
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3A2C',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quoteContainer: {
    width: '100%',
    minHeight: 300,
    padding: 20,
    backgroundColor: '#2A3A2C',
    borderRadius: 15,
  },
  quoteContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 0.5,
    marginBottom: 20,
    width: '100%',
  },
  authorText: {
    fontSize: 16,
    color: '#999999',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
  },
  refreshButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Easing, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const meditations = [
  {
    id: 'sleep',
    title: 'Deep Sleep',
    duration: '20 min',
    description: 'Fall asleep faster and sleep deeper',
    emoji: '🌙',
  },
  {
    id: 'stress',
    title: 'Stress Relief',
    duration: '15 min',
    description: 'Release tension and find calm',
    emoji: '🌊',
  },
  {
    id: 'focus',
    title: 'Focus & Clarity',
    duration: '10 min',
    description: 'Sharpen your mind and improve concentration',
    emoji: '🎯',
  },
  {
    id: 'anxiety',
    title: 'Anxiety Relief',
    duration: '15 min',
    description: 'Calm your mind and ease anxiety',
    emoji: '🕊️',
  },
  {
    id: 'morning',
    title: 'Morning Energy',
    duration: '10 min',
    description: 'Start your day with clarity and purpose',
    emoji: '☀️',
  },
];

export default function MeditationsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const backButtonOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handlePress = (id: string) => {
    // TODO: Implement meditation player
    console.log('Playing meditation:', id);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#001F0F']}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View style={[styles.backButton, { opacity: backButtonOpacity }]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Guided Meditations</Text>
          <Text style={styles.subtitle}>Find your perfect meditation</Text>
        </View>

        <View style={styles.meditationsContainer}>
          {meditations.map((meditation, index) => {
            const inputRange = [
              -1,
              0,
              120 * index,
              120 * (index + 2),
            ];
            
            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0.8],
            });

            return (
              <Animated.View
                key={meditation.id}
                style={[
                  styles.meditationCard,
                  {
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.meditationButton}
                  onPress={() => handlePress(meditation.id)}
                >
                  <Text style={styles.emoji}>{meditation.emoji}</Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.meditationTitle}>{meditation.title}</Text>
                    <Text style={styles.meditationDuration}>{meditation.duration}</Text>
                    <Text style={styles.meditationDescription}>{meditation.description}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#00FF9D',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    letterSpacing: 0.5,
  },
  meditationsContainer: {
    padding: 20,
    gap: 16,
  },
  meditationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  meditationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#00FF9D',
    borderRadius: 16,
  },
  emoji: {
    fontSize: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  meditationTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  meditationDuration: {
    fontSize: 14,
    color: '#00FF9D',
    marginBottom: 4,
  },
  meditationDescription: {
    fontSize: 14,
    color: '#999999',
  },
}); 
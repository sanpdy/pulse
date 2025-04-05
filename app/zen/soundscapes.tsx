import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const soundscapes = [
  {
    id: 'rain',
    title: 'Gentle Rain',
    description: 'Soft rainfall on leaves and rooftops',
    emoji: '🌧️',
    duration: '∞',
  },
  {
    id: 'forest',
    title: 'Forest Ambience',
    description: 'Birds chirping and leaves rustling',
    emoji: '🌲',
    duration: '∞',
  },
  {
    id: 'waves',
    title: 'Ocean Waves',
    description: 'Calm waves lapping the shore',
    emoji: '🌊',
    duration: '∞',
  },
  {
    id: 'wind',
    title: 'Mountain Wind',
    description: 'Gentle breeze through mountain peaks',
    emoji: '🏔️',
    duration: '∞',
  },
  {
    id: 'fire',
    title: 'Crackling Fire',
    description: 'Warm fireplace on a cold night',
    emoji: '🔥',
    duration: '∞',
  },
  {
    id: 'lofi',
    title: 'Lo-fi Beats',
    description: 'Chill background music',
    emoji: '🎵',
    duration: '∞',
  },
];

export default function SoundscapesScreen() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const backButtonOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const goBack = () => {
    router.back();
  };

  const handlePlay = (id: string) => {
    if (playingId === id) {
      // Stop playing
      setPlayingId(null);
      // TODO: Stop audio
    } else {
      // Start playing
      setPlayingId(id);
      // TODO: Play audio
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" hidden />
      <LinearGradient
        colors={['#000000', '#001F0F']}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View style={[styles.backButton, { opacity: backButtonOpacity }]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Soothing Soundscapes</Text>
          <Text style={styles.subtitle}>Immerse yourself in nature</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.soundscapesContainer}>
            {soundscapes.map((soundscape) => (
              <TouchableOpacity
                key={soundscape.id}
                style={[
                  styles.soundscapeCard,
                  playingId === soundscape.id && styles.playingCard,
                ]}
                onPress={() => handlePlay(soundscape.id)}
              >
                <Text style={styles.emoji}>{soundscape.emoji}</Text>
                <View style={styles.textContainer}>
                  <Text style={styles.soundscapeTitle}>{soundscape.title}</Text>
                  <Text style={styles.soundscapeDescription}>
                    {soundscape.description}
                  </Text>
                  <Text style={styles.duration}>{soundscape.duration}</Text>
                </View>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>
                    {playingId === soundscape.id ? '⏸' : '▶️'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
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
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  soundscapesContainer: {
    padding: 20,
    gap: 16,
  },
  soundscapeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#00FF9D',
  },
  playingCard: {
    backgroundColor: '#002F1A',
  },
  emoji: {
    fontSize: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  soundscapeTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  soundscapeDescription: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: '#00FF9D',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00FF9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 16,
  },
}); 
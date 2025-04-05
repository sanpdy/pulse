import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

type SoundOption = {
  id: string;
  title: string;
  icon: string;
  isPlaying: boolean;
};

export default function SoundscapesScreen() {
  const [sounds, setSounds] = useState<SoundOption[]>([
    { id: 'rain', title: 'Rain', icon: 'water-drop', isPlaying: false },
    { id: 'forest', title: 'Forest', icon: 'park', isPlaying: false },
    { id: 'waves', title: 'Ocean Waves', icon: 'waves', isPlaying: false },
    { id: 'wind', title: 'Wind', icon: 'air', isPlaying: false },
    { id: 'fire', title: 'Fire', icon: 'local-fire-department', isPlaying: false },
    { id: 'birds', title: 'Birds', icon: 'flutter-dash', isPlaying: false },
  ]);

  const toggleSound = (id: string) => {
    setSounds(sounds.map(sound => 
      sound.id === id ? { ...sound, isPlaying: !sound.isPlaying } : sound
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Soundscapes</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {sounds.map((sound) => (
            <TouchableOpacity
              key={sound.id}
              style={[styles.soundCard, sound.isPlaying && styles.playingCard]}
              onPress={() => toggleSound(sound.id)}
            >
              <MaterialIcons 
                name={sound.icon as any} 
                size={32} 
                color={sound.isPlaying ? '#4CAF50' : '#FFFFFF'} 
              />
              <Text style={[styles.soundTitle, sound.isPlaying && styles.playingText]}>
                {sound.title}
              </Text>
              <MaterialIcons 
                name={sound.isPlaying ? 'pause-circle' : 'play-circle'} 
                size={24} 
                color={sound.isPlaying ? '#4CAF50' : '#FFFFFF'} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3A2C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  soundCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  playingCard: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  soundTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 5,
  },
  playingText: {
    color: '#4CAF50',
  },
}); 
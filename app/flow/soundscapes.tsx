// SoundscapesScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Header from './Header';

// Import sound files
const rainSound = require('../../assets/sounds/rain.mp3');
const forestSound = require('../../assets/sounds/forest.mp3');
const oceanSound = require('../../assets/sounds/ocean.mp3');
const windSound = require('../../assets/sounds/wind.mp3');
const fireSound = require('../../assets/sounds/fire.mp3');
const cafeSound = require('../../assets/sounds/cafe.mp3');

type SoundOption = {
  id: string;
  title: string;
  icon: string;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  soundFile: any;
};

export default function SoundscapesScreen() {
  const [sounds, setSounds] = useState<SoundOption[]>([
    { id: 'rain', title: 'Rain', icon: 'water-drop', isPlaying: false, sound: null, soundFile: rainSound },
    { id: 'forest', title: 'Forest', icon: 'park', isPlaying: false, sound: null, soundFile: forestSound },
    { id: 'ocean', title: 'Ocean Waves', icon: 'waves', isPlaying: false, sound: null, soundFile: oceanSound },
    { id: 'wind', title: 'Wind', icon: 'air', isPlaying: false, sound: null, soundFile: windSound },
    { id: 'fire', title: 'Fire', icon: 'local-fire-department', isPlaying: false, sound: null, soundFile: fireSound },
    { id: 'cafe', title: 'cafe', icon: 'local-cafe', isPlaying: false, sound: null, soundFile: cafeSound },
  ]);

  useEffect(() => {
    // Request audio permissions
    const requestPermissions = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Audio permissions not granted');
          return;
        }
        console.log('Audio permissions granted');
      } catch (error) {
        console.error('Error requesting audio permissions:', error);
      }
    };

    requestPermissions();

    // Load all sounds when component mounts
    const loadSounds = async () => {
      try {
        const loadedSounds = await Promise.all(
          sounds.map(async (sound) => {
            try {
              console.log(`Loading sound: ${sound.id}`);
              const { sound: audioObject } = await Audio.Sound.createAsync(
                sound.soundFile,
                { 
                  isLooping: true,
                  shouldPlay: false,
                  volume: 0.2 // Set a quiet volume level
                }
              );
              console.log(`Successfully loaded sound: ${sound.id}`);
              return { ...sound, sound: audioObject };
            } catch (error) {
              console.error(`Error loading sound ${sound.id}:`, error);
              return { ...sound, sound: null };
            }
          })
        );
        setSounds(loadedSounds);
      } catch (error) {
        console.error('Error in loadSounds:', error);
      }
    };

    loadSounds();

    // Cleanup function to unload sounds when component unmounts
    return () => {
      sounds.forEach(sound => {
        if (sound.sound) {
          sound.sound.unloadAsync().catch(error => {
            console.error(`Error unloading sound ${sound.id}:`, error);
          });
        }
      });
    };
  }, []);

  const toggleSound = async (id: string) => {
    const sound = sounds.find(s => s.id === id);
    if (!sound || !sound.sound) {
      console.log(`Sound ${id} not found or not loaded`);
      return;
    }

    try {
      if (sound.isPlaying) {
        console.log(`Pausing sound: ${id}`);
        await sound.sound.pauseAsync();
      } else {
        console.log(`Playing sound: ${id}`);
        await sound.sound.playAsync();
      }

      setSounds(sounds.map(s => 
        s.id === id ? { ...s, isPlaying: !s.isPlaying } : s
      ));
    } catch (error) {
      console.error(`Error toggling sound ${id}:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <Header title="Soundscapes" />
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

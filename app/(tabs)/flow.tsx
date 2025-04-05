import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const menuOptions = [
  {
    id: 'breathing',
    title: 'Breathing',
    description: 'Calm your mind',
    image: require('../../assets/images/breathing.jpg'),
  },
  {
    id: 'soundscapes',
    title: 'Soundscapes',
    description: 'Ambient sounds',
    image: require('../../assets/images/soundscapes.jpg'),
  },
  {
    id: 'quotes',
    title: 'Quotes',
    description: 'Find inspiration',
    image: require('../../assets/images/quotes.jpg'),
  },
  {
    id: 'chat',
    title: 'Sage',
    description: 'Talk with a Zen therapist',
    image: require('../../assets/images/chat.jpg'),
  },
];

export default function FlowScreen() {
  return (
    
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      <View style={styles.content}>
        <Text style={styles.title}>Flow</Text>
        
        <View style={styles.list}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => router.push(`/flow/${option.id}`)}
            >
              <ImageBackground
                source={option.image}
                style={styles.optionImage}
                imageStyle={styles.optionImageStyle}
              >
                <View style={styles.overlay}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    letterSpacing: 8,
  },
  list: {
    marginHorizontal: -24, // Removes parent's horizontal padding for full-width
    flexDirection: 'column',
  },
  option: {
    width: '100%',
    height: 150, // Adjust height as needed
    overflow: 'hidden',
  },
  optionImage: {
    flex: 1,
    justifyContent: 'center', // Centers the overlay content vertically
  },
  optionImageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay applied uniformly
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});

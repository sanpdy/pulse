import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const menuOptions = [
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'Manage your events',
    image: require('../../assets/images/calendar.jpg'),
  },
  {
    id: 'seargant',
    title: 'Seargant',
    description: 'Get in line',
    image: require('../../assets/images/drill.jpg'),
  },
  {
    id: 'pomodoro',
    title: 'Pomodoro',
    description: 'Focus and track time',
    image: require('../../assets/images/pomodoro.jpg'),
  },
];

export default function ForgeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <View style={styles.content}>
        <Text style={styles.title}>Forge</Text>
        <View style={styles.optionsContainer}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => router.push(`/forge/${option.id}` as any)}
            >
              <ImageBackground
                source={option.image}
                style={styles.optionImage}
                imageStyle={styles.optionImageStyle}
              >
                <View style={styles.overlay}>
                  <Text style={styles.optionText}>{option.title}</Text>
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
    backgroundColor: '#330000', // dark red background
  },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
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
  optionsContainer: {
    marginHorizontal: -20,
  },
  option: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
    // marginBottom: 20,
  },
  optionImage: {
    flex: 1,
    justifyContent: 'center',
  },
  optionImageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#FFD1D1',
  },
});

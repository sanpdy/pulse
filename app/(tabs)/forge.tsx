import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ForgeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />

      <View style={styles.content}>
        <Text style={styles.title}>Forge</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, styles.forgeOption]}
            onPress={() => router.push('/forge/calendar')}
          >
            <Text style={styles.optionText}>Calendar</Text>
            <Text style={styles.optionDescription}>Manage your events</Text>
          </TouchableOpacity>
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
      padding: 20,
      justifyContent: 'center',
    },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF', // white title text
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 8,
  },
  optionsContainer: {
      gap: 20,
    },
  option: {
      padding: 25,
      borderRadius: 15,
      alignItems: 'center',
      borderWidth: 1,
    },
  forgeOption: {
    backgroundColor: 'rgba(255, 69, 58, 0.1)', // red tinted background
    borderColor: 'rgba(255, 69, 58, 0.3)', // red border
  },
  optionText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#FFFFFF', // white text for contrast
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#FFD1D1', // light red for description text
  },
});

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pulse</Text>
      </View>
      <Animated.View style={[styles.content, {
        opacity: fadeAnim,
        transform: [{ translateY: translateYAnim }],
      }]}>
        {/* Left side - Zen */}
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => router.push('/(tabs)/zen')}
        >
          <View style={[styles.optionBackground, styles.zenBackground]}>
            <View style={styles.dotPattern} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>Zen</Text>
          </View>
        </TouchableOpacity>

        {/* Right side - Grind */}
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => router.push('/(tabs)/grind')}
        >
          <View style={[styles.optionBackground, styles.grindBackground]}>
            <View style={styles.dotPattern} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>Grind</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  titleContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  optionBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  zenBackground: {
    backgroundColor: '#4A5D4C',
  },
  grindBackground: {
    backgroundColor: '#6A1B1B',
  },
  dotPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  optionEmoji: {
    fontSize: 50,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 4,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    width: '100%',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#999999',
    letterSpacing: 2,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    width: '100%',
  },
}); 
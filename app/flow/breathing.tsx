// breathing.tsx
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './Header';

type BreathingPhase = 'inhale' | 'hold' | 'exhale';

const breathingPatterns = [
  { name: '4-7-8', inhale: 4000, hold: 7000, exhale: 8000 },
  { name: 'Box', inhale: 4000, hold: 4000, exhale: 4000 },
];

export default function BreathingScreen() {
  const [isActive, setIsActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [glowAnim]);

  useEffect(() => {
    if (!isActive) return;

    const pattern = breathingPatterns[currentPattern];
    let timer: NodeJS.Timeout;

    const animate = () => {
      setCurrentPhase('inhale');
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: pattern.inhale,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setCurrentPhase('hold');
        timer = setTimeout(() => {
          setCurrentPhase('exhale');
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: pattern.exhale,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }).start(() => {
            if (isActive) animate();
          });
        }, pattern.hold);
      });
    };

    animate();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, currentPattern, scaleAnim]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
  };

  const stopBreathing = () => {
    setIsActive(false);
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <Header title="Breathing Exercises" />

      {/* Reserve space for the pattern selector */}
      <View style={styles.patternSelectorContainer}>
        {!isActive && (
          <View style={styles.patternSelector}>
            {breathingPatterns.map((pattern, index) => (
              <TouchableOpacity
                key={pattern.name}
                style={[
                  styles.patternButton,
                  currentPattern === index && styles.selectedPattern,
                ]}
                onPress={() => setCurrentPattern(index)}
              >
                <Text style={styles.patternText}>{pattern.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.centerContainer}>
        {/* Pass isActive to Bloom to conditionally show the text */}
        <Bloom scaleAnim={scaleAnim} currentPhase={currentPhase} isActive={isActive} />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={isActive ? stopBreathing : startBreathing}
        >
          <Text style={styles.patternText}>
            {isActive ? 'Exit' : 'Start Breathing'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Bloom({ scaleAnim, currentPhase, isActive }: { scaleAnim: Animated.Value; currentPhase: BreathingPhase; isActive: boolean }) {
  const petalCount = 6;
  return (
    <View style={styles.bloomContainer}>
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (360 / petalCount) * i;
        return (
          <Animated.View
            key={i}
            style={[
              styles.petal,
              {
                transform: [
                  { rotate: `${angle}deg` },
                  { translateY: -80 },
                  { scale: scaleAnim }
                ]
              }
            ]}
          />
        );
      })}
      {/* Only show the text if breathing is active */}
      {isActive && (
        <View style={styles.centerTextContainer}>
          <Text style={styles.phaseText}>{currentPhase.toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3A2C',
  },
  patternSelectorContainer: {
    height: 50, // Reserve space even when buttons are hidden
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  patternButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedPattern: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  patternText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloomContainer: {
    width: 240,
    height: 240,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petal: {
    position: 'absolute',
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  centerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  footerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

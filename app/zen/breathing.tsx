import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  SafeAreaView,
} from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type BreathingPhase = 'inhale' | 'hold' | 'exhale';

export const unstable_settings = {
  headerShown: false,
};

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

  // Continuous glow animation for the circle's shadow
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

  // Breathing cycle animation
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

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" hidden />

      {/* Header: Back button and pattern selector */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
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

      {/* Center: Breathing circle with glow */}
      <View style={styles.centerContainer}>
        <Animated.View
          style={[
            styles.glowContainer,
            {
              shadowColor: '#00FF9D',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.6],
              }),
              shadowRadius: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 12],
              }),
            },
          ]}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.phaseText}>{currentPhase.toUpperCase()}</Text>
          </Animated.View>
        </Animated.View>
      </View>

      {/* Footer: Control button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.controlButton, styles.breathingButton]}
          onPress={isActive ? stopBreathing : startBreathing}
        >
          <Text style={styles.controlButtonText}>
            {isActive ? 'Exit' : 'Start Breathing'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#00FF9D',
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
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#00FF9D',
  },
  selectedPattern: {
    backgroundColor: '#00FF9D',
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
  glowContainer: {
    borderRadius: 120,
  },
  circle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00FF9D',
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
  controlButton: {
    padding: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  breathingButton: {
    backgroundColor: '#00FF9D',
    borderWidth: 1,
    borderColor: '#00FF9D',
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 0.5,
  },
});

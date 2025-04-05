import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function GratitudeScreen() {
  const [gratitudes, setGratitudes] = useState(['', '', '']);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSave = () => {
    if (gratitudes.some(g => g.trim() === '')) {
      // TODO: Show error message
      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsEditing(false);
      // TODO: Save gratitudes to storage
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
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

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Gratitude Log</Text>
          <Text style={styles.subtitle}>What are you grateful for today?</Text>

          <ScrollView 
            style={styles.scrollView}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <View style={styles.gratitudesContainer}>
              {gratitudes.map((gratitude, index) => (
                <View key={index} style={styles.gratitudeItem}>
                  <Text style={styles.number}>{index + 1}</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={gratitude}
                      onChangeText={(text) => {
                        const newGratitudes = [...gratitudes];
                        newGratitudes[index] = text;
                        setGratitudes(newGratitudes);
                      }}
                      placeholder="I am grateful for..."
                      placeholderTextColor="#666666"
                      multiline
                    />
                  ) : (
                    <Text style={styles.gratitudeText}>
                      {gratitude || 'I am grateful for...'}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          {isEditing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
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
  mainContent: {
    flex: 1,
    padding: 32,
    paddingTop: 60,
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
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  gratitudesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  gratitudeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#00FF9D',
  },
  number: {
    fontSize: 20,
    fontWeight: '500',
    color: '#00FF9D',
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 40,
  },
  gratitudeText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#00FF9D',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 0.5,
  },
  editButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#00FF9D',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#00FF9D',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
}); 
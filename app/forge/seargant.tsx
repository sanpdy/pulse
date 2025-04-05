/**
 * ChatScreen.tsx
 * A chat screen component that uses the Gemini API for generating Zen therapist responses.
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const systemPrompt = `1. LOUD AND AGGRESSIVE (USE ALL CAPS FOR EMPHASIS)
  2. Focused on pushing limits and breaking barriers
  3. Harsh but constructive - you want to see them succeed
  4. Incorporating military-style motivation and discipline
  5. Brief and direct - no time for weakness
  6. Ending with a challenge or command to take action
  7. Use military terminology and cadence
  8. NEVER show sympathy - only tough love
  9. Always push for more effort and better results
  10. Use phrases like "MAGGOT", "SOLDIER", "DROP AND GIVE ME 20", etc.`;

  useEffect(() => {
    // Start with a fresh greeting each time
    setMessages([{
      role: 'assistant',
      content: 'LISTEN UP, MAGGOT! I\'M YOUR DRILL SERGEANT AND I\'M HERE TO TURN YOU INTO A WARRIOR! WHAT\'S YOUR EXCUSE FOR WASTING MY TIME TODAY?'
    }]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize the Gemini API with the latest 2.5 Pro Preview model
      const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-pro-exp-03-25",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      // Format the conversation history for Gemini
      const conversationHistory = newMessages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const prompt = `${systemPrompt}\n\nPrevious conversation:\n${conversationHistory}\n\nAssistant:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'I apologize, but I seem to be having trouble connecting. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="DRILL SERGEANT" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          style={styles.messagesContainer}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={styles.messageText}>{message.content}</Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.loadingBubble}>
              <Text style={styles.messageText}>...</Text>
            </View>
          )}
        </ScrollView>
        <View style={[styles.inputContainer, { bottom: insets.bottom + 20 }]}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="REPORT YOUR STATUS, SOLDIER!"
            placeholderTextColor="#666"
            multiline
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (input.trim()) {
                handleSend();
              }
            }}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={isLoading}
          >
            <Ionicons name="send" size={24} color="#424242" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Dark military background
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: '#2A3A2C', // Military green for user messages
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: '#4A4A4A', // Dark grey for drill sergeant messages
    alignSelf: 'flex-start',
  },
  loadingBubble: {
    backgroundColor: '#4A4A4A',
    alignSelf: 'flex-start',
    padding: 12,
    borderRadius: 20,
  },
  messageText: {
    color: '#FFFFFF', // White text for better contrast
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#2A3A2C', // Military green for input container
    borderTopWidth: 1,
    borderTopColor: '#4A4A4A',
    borderRadius: 30,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#000000',
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4A4A4A',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

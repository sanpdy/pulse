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

  const systemPrompt = `You are a Zen therapist, embodying wisdom, compassion, and mindfulness. 
  Your responses should be:
  1. Calm and soothing
  2. Focused on mindfulness and self-awareness
  3. Encouraging but not pushy
  4. Incorporating elements of Zen philosophy
  5. Brief and to the point
  6. Ending with a gentle question to encourage reflection`;

  useEffect(() => {
    // Start with a fresh greeting each time
    setMessages([{
      role: 'assistant',
      content: 'Welcome to your mindful space. How can I help you find peace and clarity today?'
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
      <Header title="Sage" />
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
        placeholder="Share your thoughts..."
        placeholderTextColor="#666"
        multiline
        onKeyDown={(e) => {
          // Check if the key pressed is 'Enter'
          if (e.key === 'Enter' && !e.shiftKey) {
            // Prevent the default newline behavior
            e.preventDefault();
            // Call the send handler
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
    backgroundColor: '#2A3A2C', // soft off-white for a calming background
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 100, // Extra space so messages aren't hidden behind the input
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: 'rgba(144, 244, 141, 0.93)', // light blue for user messages
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: '#C8E6C9', // light green for assistant messages
    alignSelf: 'flex-start',
  },
  loadingBubble: {
    backgroundColor: '#C8E6C9',
    alignSelf: 'flex-start',
    padding: 12,
    borderRadius: 20,
  },
  messageText: {
    color: 'rgba(63, 101, 50, 0.81)', // dark grey text for readability
    fontSize: 16,
  },
  inputContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(88, 158, 83, 0.65)', // pale teal for the input container
    borderTopWidth: 1,
    borderTopColor: 'rgba(88, 158, 83, 0.65)', // subtle border for definition
    borderRadius: 30,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF', // white background for the input field
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#424242', // dark text for clarity
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: 'rgba(201, 245, 140, 0.66)', // medium teal for the send button
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

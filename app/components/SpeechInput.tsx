import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Mic } from 'lucide-react-native';
import { analyzeEnglishSpeech } from '../services/groq';

interface SpeechInputProps {
  onAnalysis: (result: {
    pronunciation: number;
    fluency: number;
    clarity: number;
    feedback: string;
  }) => void;
}

export function SpeechInput({ onAnalysis }: SpeechInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = async () => {
    if (Platform.OS === 'web') {
      try {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setTranscript(transcript);
        };

        recognition.onend = async () => {
          setIsRecording(false);
          if (transcript) {
            const analysis = await analyzeEnglishSpeech(transcript);
            onAnalysis(analysis);
          }
        };

        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    } else {
      // For native platforms, show message about web-only feature
      alert('Speech recognition is currently available only on web platforms.');
    }
  };

  const stopRecording = () => {
    if (Platform.OS === 'web') {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isRecording && styles.recording]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Mic size={24} color={isRecording ? '#ef4444' : '#ffffff'} />
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Speaking'}
        </Text>
      </TouchableOpacity>
      {transcript ? (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptLabel}>Your Speech:</Text>
          <Text style={styles.transcript}>{transcript}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  recording: {
    backgroundColor: '#fee2e2',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  transcriptContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  transcriptLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6b7280',
    marginBottom: 8,
  },
  transcript: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#111827',
    lineHeight: 24,
  },
});
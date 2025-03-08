import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { evaluateCode } from '../services/groq';

interface CodeEditorProps {
  problem: {
    title: string;
    description: string;
    testCases: string[];
    language: string;
  };
  onSubmit: (results: {
    passed: boolean;
    feedback: string;
    testResults: Array<{
      passed: boolean;
      input: string;
      expected: string;
      actual: string;
    }>;
  }) => void;
}

export function CodeEditor({ problem, onSubmit }: CodeEditorProps) {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const results = await evaluateCode(code, problem.language, problem.testCases);
      onSubmit(results);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{problem.title}</Text>
      <Text style={styles.description}>{problem.description}</Text>
      
      <View style={styles.editorContainer}>
        <TextInput
          style={styles.editor}
          multiline
          numberOfLines={10}
          value={code}
          onChangeText={setCode}
          placeholder={`Write your ${problem.language} code here...`}
          placeholderTextColor="#6b7280"
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitting]}
        onPress={handleSubmit}
        disabled={isSubmitting || !code.trim()}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#374151',
    marginBottom: 16,
    lineHeight: 24,
  },
  editorContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  editor: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#ffffff',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitting: {
    backgroundColor: '#818cf8',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
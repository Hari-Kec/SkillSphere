import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { useStore } from '../store/useStore';

const codingProblems = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    language: 'javascript',
    testCases: [
      '[2,7,11,15], 9 => [0,1]',
      '[3,2,4], 6 => [1,2]',
      '[3,3], 6 => [0,1]',
    ],
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    language: 'javascript',
    testCases: [
      '()[] => true',
      '([)] => false',
      '{[]} => true',
    ],
  },
];

interface TestResults {
  passed: boolean;
  feedback: string;
  testResults: Array<{
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
  }>;
}

export default function CodingScreen() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [results, setResults] = useState<TestResults | null>(null);
  const updateProgress = useStore((state) => state.updateProgress);

  const handleSubmit = (results: TestResults) => {
    setResults(results);
    if (results.passed) {
      updateProgress({
        codingScore: useStore.getState().userProgress.codingScore + 1,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coding Challenges</Text>
        <Text style={styles.subtitle}>Solve programming problems and get instant feedback</Text>
      </View>

      <CodeEditor
        problem={codingProblems[currentProblem]}
        onSubmit={handleSubmit}
      />

      {results && (
        <View style={styles.resultsContainer}>
          <Text style={[
            styles.resultTitle,
            results.passed ? styles.passedText : styles.failedText
          ]}>
            {results.passed ? 'All Tests Passed!' : 'Some Tests Failed'}
          </Text>

          <Text style={styles.feedbackText}>{results.feedback}</Text>

          <View style={styles.testResults}>
            {results.testResults.map((result, index) => (
              <View key={index} style={styles.testCase}>
                <Text style={styles.testCaseTitle}>Test Case {index + 1}</Text>
                <Text style={styles.testDetail}>Input: {result.input}</Text>
                <Text style={styles.testDetail}>Expected: {result.expected}</Text>
                <Text style={styles.testDetail}>Actual: {result.actual}</Text>
                <Text style={[
                  styles.testStatus,
                  result.passed ? styles.passedText : styles.failedText
                ]}>
                  {result.passed ? 'Passed' : 'Failed'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  resultsContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#374151',
    marginBottom: 16,
    lineHeight: 20,
  },
  testResults: {
    gap: 12,
  },
  testCase: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  testCaseTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  testDetail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#374151',
    marginBottom: 4,
  },
  testStatus: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  passedText: {
    color: '#22c55e',
  },
  failedText: {
    color: '#ef4444',
  },
});
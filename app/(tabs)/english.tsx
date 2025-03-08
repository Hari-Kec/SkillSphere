import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { SpeechInput } from '../components/SpeechInput';
import { ProgressBar } from '../components/ProgressBar';
import { useStore } from '../store/useStore';

interface SpeechAnalysis {
  pronunciation: number;
  fluency: number;
  clarity: number;
  feedback: string;
}

export default function EnglishScreen() {
  const [analysis, setAnalysis] = useState<SpeechAnalysis | null>(null);
  const updateProgress = useStore((state) => state.updateProgress);

  const handleAnalysis = (result: SpeechAnalysis) => {
    setAnalysis(result);
    const averageScore = (result.pronunciation + result.fluency + result.clarity) / 3;
    updateProgress({
      englishScore: Math.round(averageScore * 10),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>English Speaking Practice</Text>
        <Text style={styles.subtitle}>Practice your English speaking skills with AI feedback</Text>
      </View>

      <SpeechInput onAnalysis={handleAnalysis} />

      {analysis && (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Analysis Results</Text>
          
          <View style={styles.scores}>
            <ProgressBar
              label="Pronunciation"
              progress={analysis.pronunciation}
              total={10}
            />
            <ProgressBar
              label="Fluency"
              progress={analysis.fluency}
              total={10}
            />
            <ProgressBar
              label="Clarity"
              progress={analysis.clarity}
              total={10}
            />
          </View>

          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>Feedback</Text>
            <Text style={styles.feedbackText}>{analysis.feedback}</Text>
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
  analysisContainer: {
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
  analysisTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  scores: {
    marginBottom: 16,
  },
  feedbackContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#374151',
    lineHeight: 20,
  },
});
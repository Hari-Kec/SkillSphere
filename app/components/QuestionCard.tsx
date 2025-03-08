import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useStore } from '../store/useStore';

interface QuestionCardProps {
  question: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  };
  type: 'aptitude' | 'english' | 'coding';
  onComplete: () => void;
}

export function QuestionCard({ question, type, onComplete }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const updateProgress = useStore((state) => state.updateProgress);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      const currentState = useStore.getState().userProgress;
      updateProgress({
        questionsCompleted: currentState.questionsCompleted + 1,
        [type === 'aptitude' ? 'aptitudeScore' : 
         type === 'english' ? 'englishScore' : 'codingScore']: 
         currentState[`${type}Score`] + 1
      });
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === option && styles.selectedOption,
              selectedAnswer && option === question.correctAnswer && styles.correctOption,
            ]}
            onPress={() => !selectedAnswer && handleAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isCorrect !== null && (
        <View style={styles.feedback}>
          <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.incorrectText]}>
            {isCorrect ? 'Correct!' : 'Incorrect. Try another question!'}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={onComplete}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  selectedOption: {
    backgroundColor: '#e0e7ff',
    borderColor: '#6366f1',
  },
  correctOption: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#111827',
  },
  feedback: {
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  correctText: {
    color: '#22c55e',
  },
  incorrectText: {
    color: '#ef4444',
  },
  nextButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
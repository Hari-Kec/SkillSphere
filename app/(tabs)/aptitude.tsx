import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const questions = [
  {
    id: '1',
    question: 'If a train travels 360 kilometers in 4 hours, what is its speed in kilometers per hour?',
    options: ['80 km/h', '90 km/h', '85 km/h', '95 km/h'],
    correctAnswer: '90 km/h',
  },
  {
    id: '2',
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: '30',
  },
  // Add more questions here
];

export default function AptitudeScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}/{questions.length}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</Text>
        <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option && styles.selectedOption,
                selectedAnswer && option === questions[currentQuestion].correctAnswer && styles.correctOption,
              ]}
              onPress={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedAnswer && (
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  score: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#6366f1',
  },
  questionContainer: {
    padding: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#ffffff',
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
  nextButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
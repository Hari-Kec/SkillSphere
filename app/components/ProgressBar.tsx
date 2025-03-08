import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number;
  total: number;
  label: string;
}

export function ProgressBar({ progress, total, label }: ProgressBarProps) {
  const percentage = (progress / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.progress}>{progress}/{total}</Text>
      </View>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  progress: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
  },
  bar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
});
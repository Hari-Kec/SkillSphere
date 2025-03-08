import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Aptitude</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>92%</Text>
          <Text style={styles.statLabel}>English</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>78%</Text>
          <Text style={styles.statLabel}>Coding</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Questions Solved</Text>
            <Text style={styles.progressValue}>120/150</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '80%' }]} />
            </View>
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Daily Streak</Text>
            <Text style={styles.progressValue}>15 days</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '50%' }]} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>Quick Learner</Text>
            <Text style={styles.achievementDescription}>Completed 50 questions in a day</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>Problem Solver</Text>
            <Text style={styles.achievementDescription}>Solved 10 coding challenges</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  progressValue: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginTop: 4,
  },
});
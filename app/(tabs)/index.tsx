import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop' }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Placement Prep</Text>
          <Text style={styles.headerSubtitle}>Your path to success</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Average Score</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statLabel}>Questions Solved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Days Streak</Text>
        </View>
      </View>

      <View style={styles.sectionsContainer}>
        <Link href="/aptitude" asChild>
          <TouchableOpacity style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Aptitude</Text>
            <Text style={styles.sectionDescription}>Practice quantitative and logical reasoning</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/english" asChild>
          <TouchableOpacity style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>English</Text>
            <Text style={styles.sectionDescription}>Improve your verbal and written skills</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/coding" asChild>
          <TouchableOpacity style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Coding</Text>
            <Text style={styles.sectionDescription}>Solve programming challenges</Text>
          </TouchableOpacity>
        </Link>
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
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
  },
  headerSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 16,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
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
  sectionsContainer: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginTop: 4,
  },
});
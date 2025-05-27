import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';

const SaturdayScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#444" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.dayTitle}>Saturday</Text>
      <Text style={styles.workoutTitle}>HIIT + Core 🏋🏻</Text>

      <View style={styles.workoutBlock}>
        <Text style={styles.workoutItemTitle}>1. Jump Squats</Text>
        <Text style={styles.workoutDetails}>3 sets × 20 seconds</Text>

        <Text style={styles.workoutItemTitle}>2. Mountain Climbers</Text>
        <Text style={styles.workoutDetails}>3 sets × 30 seconds</Text>

        <Text style={styles.workoutItemTitle}>3. Russian Twists</Text>
        <Text style={styles.workoutDetails}>3 sets × 20 reps</Text>

        <Text style={styles.workoutItemTitle}>4. High Knees</Text>
        <Text style={styles.workoutDetails}>3 sets × 30 seconds</Text>

        <Text style={styles.workoutItemTitle}>5. Plank</Text>
        <Text style={styles.workoutDetails}>3 sets × 45 seconds</Text>
      </View>

      <Text style={styles.videoTitle}>Workout Demo Video 🎥</Text>
      <View style={styles.videoContainer}>
        <WebView
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: 'https://www.youtube.com/embed/ml6cT4AZdqI' }} // 20-min HIIT Core workout
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold',
  },
  dayTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  workoutBlock: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  workoutItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  workoutDetails: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#000',
  },
  videoContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 40,
  },
});

export default SaturdayScreen;

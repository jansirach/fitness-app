import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';

const MondayScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#444" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.dayTitle}>Monday</Text>
      <Text style={styles.workoutTitle}>Full Body Strength 💪</Text>

      <View style={styles.workoutBlock}>
      <View style={styles.workoutItem}>
        <Text style={styles.workoutName}>1. Squats</Text>
        <Text style={styles.workoutDetails}>4 sets × 12 reps</Text>
      </View>

      <View style={styles.workoutItem}>
        <Text style={styles.workoutName}>2. Push-Ups</Text>
        <Text style={styles.workoutDetails}>3 sets × 15 reps</Text>
      </View>

      <View style={styles.workoutItem}>
        <Text style={styles.workoutName}>3. Dumbbell Rows</Text>
        <Text style={styles.workoutDetails}>3 sets × 10 reps each arm</Text>
      </View>

      <View style={styles.workoutItem}>
        <Text style={styles.workoutName}>4. Plank</Text>
        <Text style={styles.workoutDetails}>3 sets × 30 seconds</Text>
      </View>
      </View>

      <Text style={styles.videoTitle}>Workout Demo 🎥</Text>
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/UoC_O3HzsH0' }} // Bodyweight full body workout
          style={{ height: 200 }}
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
    textAlign: 'center',
  },
    workoutBlock: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  workoutItem: {
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  videoContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default MondayScreen;

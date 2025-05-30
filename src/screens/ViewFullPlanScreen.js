import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const workoutPlan = [
  { day: 'Monday', icon: 'dumbbell', workout: 'Full Body Strength' },
  { day: 'Tuesday', icon: 'walking', workout: 'Light Cardio + Stretching' },
  { day: 'Wednesday', icon: 'heartbeat', workout: 'Cardio + Core' },
  { day: 'Thursday', icon: 'biking', workout: 'Active Recovery: Biking / Yoga' },
  { day: 'Friday', icon: 'hand-rock', workout: 'Upper Body Strength' },
  { day: 'Saturday', icon: 'running', workout: 'HIIT + Core' },
  { day: 'Sunday', icon: 'bed', workout: 'Rest & Recovery' },
];

const ViewFullPlanScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#444" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Weekly Plan 🏋️</Text>

      {workoutPlan.map((item, index) => (
  <TouchableOpacity
    key={index}
    style={styles.card}
    onPress={() => navigation.navigate(item.day)}
  >
    <Icon name={item.icon} size={24} color="#e85d04" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.day}>{item.day}</Text>
      <Text style={styles.workout}>{item.workout}</Text>
    </View>
  </TouchableOpacity>
))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#444',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  day: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  workout: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});

export default ViewFullPlanScreen;

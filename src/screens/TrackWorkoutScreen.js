import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TrackWorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  const loadWorkouts = async () => {
    try {
      const stored = await AsyncStorage.getItem('workouts');
      const parsed = stored ? JSON.parse(stored) : [];
      setWorkouts(parsed.reverse());
    } catch (error) {
      console.error('Error loading workouts:', error);
    }
  };

  const deleteWorkout = async (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this workout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = workouts.filter(w => w.id !== id);
          await AsyncStorage.setItem('workouts', JSON.stringify(updated.reverse())); // save in original order
          setWorkouts(updated);
        },
      },
    ]);
  };

  const editWorkout = (workout) => {
    navigation.navigate('LogWorkout', { workout });
  };

  useFocusEffect(useCallback(() => { loadWorkouts(); }, []));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Track Your Workout</Text>
      <Text style={styles.subText}>Your saved workouts:</Text>

      {workouts.length === 0 ? (
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>No workouts logged yet.</Text>
        </View>
      ) : (
        workouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              {workout.sets && workout.reps ? (
                <Text style={styles.workoutDetails}>Sets: {workout.sets} | Reps: {workout.reps}</Text>
              ) : (
                <Text style={styles.workoutDetails}>Duration: {workout.duration}</Text>
              )}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => editWorkout(workout)} style={styles.iconButton}>
                <Icon name="pencil" size={18} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteWorkout(workout.id)} style={styles.iconButton}>
                <Icon name="trash" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.logButton} onPress={() => navigation.navigate('LogWorkout')}>
        <Text style={styles.logButtonText}>Log New Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, paddingTop: 60, backgroundColor: '#fff', flexGrow: 1,
  },
  backButton: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 20,
  },
  backText: {
    marginLeft: 10, fontSize: 16, color: '#000',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#e85d04', marginBottom: 10,
  },
  subText: {
    fontSize: 16, color: '#333', marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
  },
  workoutName: {
    fontSize: 18, fontWeight: 'bold', color: '#333',
  },
  workoutDetails: {
    fontSize: 14, color: '#555',
  },
  actionButtons: {
    flexDirection: 'row', marginLeft: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  logButton: {
    marginTop: 30, backgroundColor: '#e85d04', padding: 15, borderRadius: 10, alignItems: 'center',
  },
  logButtonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold',
  },
  placeholderCard: {
    backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16, color: '#666', textAlign: 'center',
  },
});

export default TrackWorkoutScreen;

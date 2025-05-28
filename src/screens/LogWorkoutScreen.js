import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const LogWorkoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const editingWorkout = route.params?.workout;

  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (editingWorkout) {
      setName(editingWorkout.name || '');
      setSets(editingWorkout.sets || '');
      setReps(editingWorkout.reps || '');
      setDuration(editingWorkout.duration || '');
    }
  }, [editingWorkout]);

  const isDurationMode = duration.length > 0;
  const isSetsRepsMode = sets.length > 0 || reps.length > 0;

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a workout name.');
      return;
    }

    if (!isDurationMode && (!sets || !reps)) {
      Alert.alert('Error', 'Please enter sets and reps.');
      return;
    }

    if (!isSetsRepsMode && !duration) {
      Alert.alert('Error', 'Please enter a duration.');
      return;
    }

    const newWorkout = {
      id: editingWorkout?.id || uuid.v4(),
      name: name.trim(),
      sets: isDurationMode ? null : sets.trim(),
      reps: isDurationMode ? null : reps.trim(),
      duration: isSetsRepsMode ? null : duration.trim(),
    };

    try {
      const stored = await AsyncStorage.getItem('workouts');
      let workouts = stored ? JSON.parse(stored) : [];

      if (editingWorkout) {
        workouts = workouts.map(w =>
          w.id === editingWorkout.id ? newWorkout : w
        );
      } else {
        workouts.push(newWorkout);
      }

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingWorkout ? 'Edit Workout' : 'Log Workout'}
      </Text>

      <Text style={styles.label}>Workout Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter workout name"
      />

      {!isDurationMode && (
        <>
          <Text style={styles.label}>Sets</Text>
          <TextInput
            style={styles.input}
            value={sets}
            onChangeText={text => {
              setSets(text);
              if (text) setDuration('');
            }}
            placeholder="Enter number of sets"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Reps</Text>
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={text => {
              setReps(text);
              if (text) setDuration('');
            }}
            placeholder="Enter number of reps"
            keyboardType="numeric"
          />
        </>
      )}

      {!isSetsRepsMode && (
        <>
          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={text => {
              setDuration(text);
              if (text) {
                setSets('');
                setReps('');
              }
            }}
            placeholder="Enter duration (e.g. 30 mins)"
          />
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {editingWorkout ? 'Update Workout' : 'Save Workout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#e85d04',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogWorkoutScreen;

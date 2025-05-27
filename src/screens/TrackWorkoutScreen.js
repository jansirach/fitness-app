import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TrackWorkoutScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Track Your Workout</Text>
      <Text style={styles.subText}>Start tracking your workout progress here!</Text>

      {/* Placeholder content */}
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderText}>Workout tracking features coming soon!</Text>
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
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  placeholderCard: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default TrackWorkoutScreen;

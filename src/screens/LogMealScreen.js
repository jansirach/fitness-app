import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Menu, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogMealScreen = ({ navigation }) => {
  const [mealTypeMenuVisible, setMealTypeMenuVisible] = useState(false);
  const [mealTimeMenuVisible, setMealTimeMenuVisible] = useState(false);

  const [mealType, setMealType] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!mealType || !mealTime) {
      console.warn("Please select both meal type and time.");
      return;
    }

    const newMeal = {
      id: Date.now(),
      type: mealType,
      time: mealTime,
      notes,
    };

    try {
      const existing = await AsyncStorage.getItem('meals');
      const meals = existing ? JSON.parse(existing) : [];
      const updatedMeals = [...meals, newMeal];
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
      console.log("Meal saved to storage", updatedMeals);

      setMealType('');
      setMealTime('');
      setNotes('');
    } catch (err) {
      console.error('Failed to log meal:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Log Your Meal</Text>
      <Text style={styles.subText}>Easily keep track of what you eat 🍽️</Text>

      {/* Meal Type Menu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Meal Type</Text>
        <Menu
          visible={mealTypeMenuVisible}
          onDismiss={() => setMealTypeMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMealTypeMenuVisible(true)} style={styles.outlinedButton} labelStyle={styles.outlinedButtonText}>
              {mealType ? mealType : 'Select meal type'}
            </Button>
          }
        >
          <Menu.Item title="Breakfast" onPress={() => { setMealType('Breakfast'); setMealTypeMenuVisible(false); }} />
          <Menu.Item title="Lunch" onPress={() => { setMealType('Lunch'); setMealTypeMenuVisible(false); }} />
          <Menu.Item title="Dinner" onPress={() => { setMealType('Dinner'); setMealTypeMenuVisible(false); }} />
          <Menu.Item title="Snack" onPress={() => { setMealType('Snack'); setMealTypeMenuVisible(false); }} />
        </Menu>
      </View>

      {/* Meal Time Menu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Time</Text>
        <Menu
          visible={mealTimeMenuVisible}
          onDismiss={() => setMealTimeMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMealTimeMenuVisible(true)} style={styles.outlinedButton} labelStyle={styles.outlinedButtonText}>
              {mealTime ? mealTime : 'Select time of day'}
            </Button>
          }
        >
          <Menu.Item title="Morning" onPress={() => { setMealTime('Morning'); setMealTimeMenuVisible(false); }} />
          <Menu.Item title="Afternoon" onPress={() => { setMealTime('Afternoon'); setMealTimeMenuVisible(false); }} />
          <Menu.Item title="Evening" onPress={() => { setMealTime('Evening'); setMealTimeMenuVisible(false); }} />
        </Menu>
      </View>

      {/* Notes Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={(text) => setNotes(text)}
          placeholder="What did you eat? Any notes?"
          placeholderTextColor="#999"
        />
      </View>

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!mealType || !mealTime}
        style={[styles.button, (!mealType || !mealTime) && styles.disabledButton]}
        labelStyle={styles.buttonText}
      >
        Log Meal
      </Button>

      {/* View Past Meals Card */}
      <TouchableOpacity onPress={() => navigation.navigate('PastMeals')} style={{ marginTop: 30 }}>
        <Card style={styles.viewCard}>
          <Card.Content>
            <Text style={styles.viewCardTitle}>🍱 View Logged Meals</Text>
            <Text style={styles.viewCardText}>Check your past meal entries</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlinedButton: {
    borderColor: '#606c38',
    borderWidth: 1,
  },
  outlinedButtonText: {
    color: '#283618',
  },
  viewCard: {
    backgroundColor: '#fefae0',
    borderRadius: 10,
    elevation: 3,
  },
  viewCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#606c38',
  },
  viewCardText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});

export default LogMealScreen;

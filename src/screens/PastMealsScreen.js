import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const PastMealsScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const stored = await AsyncStorage.getItem('meals');
        const parsed = stored ? JSON.parse(stored) : [];
        setMeals(parsed.reverse()); // show latest first
      } catch (err) {
        console.error('Error loading meals:', err);
      }
    };

    fetchMeals();
  }, []);

  const clearMeals = async () => {
    try {
      await AsyncStorage.removeItem('meals');
      setMeals([]);
      console.log("All meals cleared.");
    } catch (err) {
      console.error('Failed to clear meals:', err);
    }
  };

  const renderMeal = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.mealTitle}>{item.type} - {item.time}</Text>
        {item.notes ? <Text style={styles.notes}>Notes: {item.notes}</Text> : null}
        <Text style={styles.timestamp}>{new Date(item.id).toLocaleString()}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Logged Meals</Text>

      {meals.length === 0 ? (
        <Text style={styles.emptyText}>No meals logged yet.</Text>
      ) : (
        <>
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMeal}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <Button
            mode="outlined"
            onPress={clearMeals}
            style={styles.clearButton}
            labelStyle={{ color: '#d00000', fontWeight: 'bold' }}
          >
            Clear All Meals
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notes: {
    marginTop: 5,
    color: '#555',
  },
  timestamp: {
    marginTop: 8,
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 50,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 10,
    borderColor: '#d00000',
    borderWidth: 1.5,
    alignSelf: 'center',
  },
});

export default PastMealsScreen;

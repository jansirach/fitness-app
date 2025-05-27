import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const profile = user?.profile;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Icon */}
      <View style={styles.iconContainer}>
        <Icon name="user-circle" size={80} color="#000" />
      </View>

      <Text style={styles.greeting}>Welcome, {user?.name} 👋</Text>

      <View style={styles.cardRowContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Your Profile</Text>
          <Text style={styles.cardText}>Goal: {profile?.goal || 'N/A'}</Text>
          <Text style={styles.cardText}>Gender: {profile?.gender || 'N/A'}</Text>
          <Text style={styles.cardText}>Height: {profile?.height} cm</Text>
          <Text style={styles.cardText}>Weight: {profile?.weight} kg</Text>
        </View>
        {/* <Image source={require('../assets/images/workout.png')} style={styles.cardImage} /> */}
      </View>

      <View style={styles.card}>
  <Text style={styles.cardTitle}>Today's Stats</Text>
  <BarChart
    data={{
      labels: ['Workout', 'Calories', 'Steps'],
      datasets: [
        {
          data: [2, 2.5, 2.5], // replace with real data later
        },
      ],
    }}
    width={Dimensions.get('window').width - 60}
    height={220}
    yAxisLabel=""
    chartConfig={{
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(68, 68, 68, ${opacity})`,
      labelColor: () => '#444',
      barPercentage: 0.6,
    }}
    style={{
      marginTop: 8,
      borderRadius: 8,
      marginLeft: -5,
    }}
  />
</View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Track Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Log Meal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.workoutCard}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Workout Plan</Text>
          <Text style={styles.cardText}>• Monday: Full Body Strength</Text>
          <Text style={styles.cardText}>• Wednesday: Cardio + Core</Text>
          <Text style={styles.cardText}>• Friday: Upper Body</Text>
          <TouchableOpacity
            style={styles.viewPlanButton}
            onPress={() => navigation.navigate('ViewFullPlan')}
        >
          <Text style={styles.viewPlanText}>View Full Plan</Text>
          </TouchableOpacity>

        </View>
        <Image source={require('../assets/images/human.png')} style={styles.cardImage} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#e9edc9',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardRowContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#e9edc9',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workoutCard: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#444',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 20,
    paddingBottom: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  statText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#e85d04',
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#000',
    fontWeight: 'bold',
  },
  viewPlanButton: {
    marginTop: 10,
    backgroundColor: '#e85d04',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewPlanText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#d00000',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

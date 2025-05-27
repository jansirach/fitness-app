import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';

const TuesdayScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#444" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.dayTitle}>Tuesday</Text>
      <Text style={styles.workoutTitle}>Light Cardio + Stretching 🚶🏻‍♂️</Text>

      <View style={styles.workoutBlock}>
        <Text style={styles.exercise}>🚶 Brisk Walk – 15 minutes</Text>
        <Text style={styles.exercise}>🧘 Forward Fold Stretch – 3 sets × 30 sec</Text>
        <Text style={styles.exercise}>🧍‍♂️ Standing Quad Stretch – 2 sets × 30 sec (each leg)</Text>
        <Text style={styles.exercise}>🪑 Seated Hamstring Stretch – 2 sets × 30 sec (each leg)</Text>
        <Text style={styles.exercise}>🌀 Torso Twist – 3 sets × 15 reps</Text>
      </View>

      <Text style={styles.sectionTitle}>Workout Demo 🎥</Text>
      <View style={{ height: 200, marginBottom: 20 }}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/hGYFfYD2oKA?si=zAGW6ZNGX1c7WE5x' }} // Light cardio & stretch example
          style={{ borderRadius: 10 }}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  workoutBlock: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  exercise: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default TuesdayScreen;

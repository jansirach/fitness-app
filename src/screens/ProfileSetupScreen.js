import { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import { AuthContext } from '../auth/AuthContext';

const ProfileSetupScreen = ({ navigation }) => {
  const { completeProfile } = useContext(AuthContext);

  const [form, setForm] = useState({
    gender: '',
    goal: '',
    height: '',
    weight: ''
  });

  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  const [goalMenuVisible, setGoalMenuVisible] = useState(false);

  const handleSubmit = async () => {
    if (!form.gender || !form.goal || !form.height || !form.weight) {
      console.warn("Please fill in all required fields!");
      return;
    }

    const result = await completeProfile(form);
    if (result.success) {
      navigation.replace('ProfileComplete');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Complete Your Profile</Text>

      {/* Gender Menu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <Menu
          visible={genderMenuVisible}
          onDismiss={() => setGenderMenuVisible(false)}
          anchor={
            <Button 
            mode="outlined" 
            onPress={() => setGenderMenuVisible(true)}
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
            >
            
              {form.gender ? form.gender : 'Select your gender'}
            </Button>
          }
        >
          <Menu.Item title="Male" onPress={() => { setForm({ ...form, gender: 'Male' }); setGenderMenuVisible(false); }} theme={{ colors: { text: '#000' } }} />
          <Menu.Item title="Female" onPress={() => { setForm({ ...form, gender: 'Female' }); setGenderMenuVisible(false); }} theme={{ colors: { text: '#000' } }} />
          <Menu.Item title="Other" onPress={() => { setForm({ ...form, gender: 'Other' }); setGenderMenuVisible(false); }} theme={{ colors: { text: '#000' } }} />
        </Menu>
      </View>

      {/* Goal Menu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Main Goal</Text>
        <Menu
          visible={goalMenuVisible}
          onDismiss={() => setGoalMenuVisible(false)}
          anchor={
            <Button 
            mode="outlined" 
            onPress={() => setGoalMenuVisible(true)}
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
            >
              {form.goal ? form.goal : 'Select your goal'}
            </Button>
          }
        >
          <Menu.Item title="Lose Weight" onPress={() => { setForm({ ...form, goal: 'Lose Weight' }); setGoalMenuVisible(false); }} theme={{ colors: { text: '#000' } }} />
          <Menu.Item title="Build Muscle" onPress={() => { setForm({ ...form, goal: 'Build Muscle' }); setGoalMenuVisible(false); }} theme={{ colors: { text: '#000' } }} />
          <Menu.Item title="Stay Fit" onPress={() => { setForm({ ...form, goal: 'Stay Fit' }); setGoalMenuVisible(false); }} theme={{ colors: { text: '#000' } }} />
        </Menu>
      </View>

      {/* Height Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.height}
          onChangeText={(text) => setForm({ ...form, height: text })}
          placeholder="170"
          placeholderTextColor="#999"
          required
        />
      </View>

      {/* Weight Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.weight}
          onChangeText={(text) => setForm({ ...form, weight: text })}
          placeholder="70"
          placeholderTextColor="#999"
          required
        />
      </View>

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!form.gender || !form.goal || !form.height || !form.weight}
        style={[styles.button, (!form.gender || !form.goal || !form.height || !form.weight) && styles.disabledButton]}
        labelStyle={styles.buttonText}
      >
        {form.gender && form.goal && form.height && form.weight ? 'CONTINUE' : 'FILL ALL FIELDS'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
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
    height: 50,
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
  borderColor: '#606c38', // Dark greenish color
  borderWidth: 1,
},
outlinedButtonText: {
  color: '#283618', // Even darker green
}

});

export default ProfileSetupScreen;
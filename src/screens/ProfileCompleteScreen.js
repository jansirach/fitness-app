import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';

const ProfileCompleteScreen = ({ navigation }) => {
  const { setHasCompletedProfile } = useContext(AuthContext);

  const handleLetsGo = () => {
    // This will trigger AppNavigator to switch to Home
    setHasCompletedProfile(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Complete! 🎉</Text>
      <Text style={styles.subtitle}>You're all set to start your fitness journey</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLetsGo}
      >
        <Text style={styles.buttonText}>LET'S GO!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#666',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ProfileCompleteScreen;

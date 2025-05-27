import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../auth/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      Alert.alert('Error', result.error || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/neshfit.png')}
        style={styles.logo}
      />
      
      <Text style={styles.title}>Welcome</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon 
            name={showPassword ? "eye-slash" : "eye"} 
            size={20} 
            color="#666" 
            style={styles.passwordIcon} 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.demoAccountsContainer}>
  <Text style={styles.footerText}>Try these demo accounts:</Text>
  <View style={styles.accountsList}>
    <Text style={styles.demoText}>user@demo.com / 123456</Text>
    <Text style={styles.demoText}>trainer@demo.com / trainer123</Text>
  </View>
  </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  passwordIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  footerText: {
    color: '#666',
    marginRight: 5,
    fontWeight: 'bold',
  },
  footerLink: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  demoAccountsContainer: {
  marginTop: 16,
  alignItems: 'center', 
},
accountsList: {
  marginTop: 4,
},
demoText: {
  fontSize: 12,
  color: '#666',
  textAlign: 'center', 
  lineHeight: 20, 
},
});

export default LoginScreen;
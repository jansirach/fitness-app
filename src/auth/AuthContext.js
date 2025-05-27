import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  // Enhanced mock user data with profile info
  const mockUsers = [
    { 
      email: 'user@demo.com', 
      password: '123456', 
      name: 'Demo User',
      profile: {
        completed: false,
        gender: '',
        goal: '',
        height: '',
        weight: ''
      }
    },
    { 
      email: 'trainer@demo.com', 
      password: 'trainer123', 
      name: 'Fitness Trainer',
      profile: {
        completed: true,
        gender: 'male',
        goal: 'fitness',
        height: '180',
        weight: '80'
      }
    }
  ];

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setHasCompletedProfile(parsedUser.profile?.completed || false);
        }
      } catch (error) {
        console.log('Error reading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = mockUsers.find(
        user => user.email === email && user.password === password
      );

      if (foundUser) {
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        setUser(foundUser);
        setHasCompletedProfile(foundUser.profile.completed);
        return { success: true, user: foundUser };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.log('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const completeProfile = async (profileData) => {
    try {
      const updatedUser = {
        ...user,
        profile: {
          ...profileData,
          completed: true
        }
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.log('Profile completion error:', error);
      return { success: false, error: 'Failed to save profile' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setHasCompletedProfile(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      hasCompletedProfile,
      login, 
      logout,
      completeProfile,
      setHasCompletedProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
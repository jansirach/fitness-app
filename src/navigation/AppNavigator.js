import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ProfileCompleteScreen from '../screens/ProfileCompleteScreen';
import ViewFullPlanScreen from '../screens/ViewFullPlanScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, hasCompletedProfile } = useContext(AuthContext);

  let screens;

  if (!user) {
    screens = (
      <Stack.Screen name="Login" component={LoginScreen} />
    );
  } else if (!hasCompletedProfile) {
    screens = (
      <>
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="ProfileComplete" component={ProfileCompleteScreen} />
      </>
    );
  } else {
    screens = (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ViewFullPlan" component={ViewFullPlanScreen} />
      </>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens}
    </Stack.Navigator>
  );
};

export default AppNavigator;

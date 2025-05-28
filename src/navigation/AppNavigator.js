import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ProfileCompleteScreen from '../screens/ProfileCompleteScreen';
import TrackWorkoutScreen from '../screens/TrackWorkoutScreen';
import LogMealScreen from '../screens/LogMealScreen';
import ViewFullPlanScreen from '../screens/ViewFullPlanScreen';
import MondayScreen from '../screens/weekly/MondayScreen';
import TuesdayScreen from '../screens/weekly/TuesdayScreen'; 
import WednesdayScreen from '../screens/weekly/WednesdayScreen';
import ThursdayScreen from '../screens/weekly/ThursdayScreen';
import FridayScreen from '../screens/weekly/FridayScreen';
import SaturdayScreen from '../screens/weekly/SaturdayScreen';
import SundayScreen from '../screens/weekly/SundayScreen';
import PastMealsScreen from '../screens/PastMealsScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';

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
        <Stack.Screen name="TrackWorkout" component={TrackWorkoutScreen} />
        <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} />
        <Stack.Screen name="LogMeal" component={LogMealScreen} />
        <Stack.Screen name="PastMeals" component={PastMealsScreen} />
        <Stack.Screen name="ViewFullPlan" component={ViewFullPlanScreen} />

                      {/* weekly screens */}
        <Stack.Screen name="Monday" component={MondayScreen} />
        <Stack.Screen name="Tuesday" component={TuesdayScreen} />
        <Stack.Screen name="Wednesday" component={WednesdayScreen} />
        <Stack.Screen name="Thursday" component={ThursdayScreen} />
        <Stack.Screen name="Friday" component={FridayScreen} />
        <Stack.Screen name="Saturday" component={SaturdayScreen} />
        <Stack.Screen name="Sunday" component={SundayScreen} />
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

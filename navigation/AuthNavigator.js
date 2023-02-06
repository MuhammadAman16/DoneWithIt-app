import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import Welcomescreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={Welcomescreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

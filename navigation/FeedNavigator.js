import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';
import colors from '../config/color';

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_bottom',
      gestureEnabled: true,
    }}>
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={{title: '', headerTintColor: colors.primary}}
    />
  </Stack.Navigator>
);

export default FeedNavigator;

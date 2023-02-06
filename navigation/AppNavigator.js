import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AccountNavigator from './AccountNavigator';

import FeedNavigator from './FeedNavigator';
import ListingEditScreen from '../screens/ListingEditScreen';
import NewListingButton from './NewListingButton';
import routes from './routes';
import useNotification from '../screens/hooks/useNotification';
import colors from '../config/color';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotification();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarInactiveTintColor: colors.medium,
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({navigation}) => ({
          headerShown: false,
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarInactiveTintColor: colors.medium,
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;

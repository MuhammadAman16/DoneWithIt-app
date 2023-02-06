import React, {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from './navigation/AppNavigator';
import OfflineNotice from './components/OfflineNotice';
import AuthNavigator from './navigation/AuthNavigator';
import AuthContext from './auth/context';
import authStorage from './auth/storage';
import {navigationRef} from './navigation/rootNavigation';
// Wrap your app with the new GestureHandler
// <Welcomescreen />
// <ViewImageScreen />
// <ListingDetailsScreen />
// <AccountScreen></AccountScreen>
// <ListingsScreen></ListingsScreen>
// <GestureHandlerRootView style={{flex: 1}}>
//   <MessagesScreen />
// </GestureHandlerRootView>

// OFFLINE NOTICE NOT DISPLAYING
// SPACE AND A DOT IN PASSWORD ARE COMING

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
    }
  };
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
      } catch (error) {
        console.log('Error loading app', error);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
      } catch (error) {
        console.log('Error loading app', error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onNavigationContainerReady = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <OfflineNotice />
      <NavigationContainer
        ref={navigationRef}
        onReady={onNavigationContainerReady}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

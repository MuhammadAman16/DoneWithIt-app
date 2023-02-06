import React from 'react';
import {ImageBackground, Text, View, StyleSheet, Image} from 'react-native';

import AppButton from '../components/AppButton';
import routes from '../navigation/routes';

function Welcomescreen({navigation}) {
  return (
    <ImageBackground
      blurRadius={6}
      style={styles.background}
      source={require('../assets/background.jpg')}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-red.png')} style={styles.logo} />
        <Text style={styles.tagline}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title={'Login'}
          onPress={() => {
            navigation.navigate(routes.LOGIN);
          }}></AppButton>

        <AppButton
          title={'Sign Up'}
          onPress={() => {
            navigation.navigate(routes.REGISTER);
          }}
          color="secondary"></AppButton>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  tagline: {
    fontFamily: 'Roboto',
    fontSize: 20,
    paddingVertical: 20,
    fontStyle: 'italic',
    fontWeight: '800',
  },
});

export default Welcomescreen;

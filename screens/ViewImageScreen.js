import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import colors from '../config/color';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';

function ViewImageScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/chair.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons
          name="close"
          color={colors.secondary}
          size={35}
        />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color={colors.primary}
          size={35}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 30,
    left: 40,
  },
  deleteIcon: {
    top: 30,
    right: 40,
    position: 'absolute',
  },
});

export default ViewImageScreen;

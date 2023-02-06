import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/color';

function ImageInput({imageUri, onChangeImage}) {
  // to call it only once we use an empty array, also // we cannot call an await function in useEffect
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert('You need to enable permission to acess library');
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert('Delete', 'Are you sure you want to delete this image', [
        {text: 'Yes', onPress: () => onChangeImage(null)},
        {text: 'No'},
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      // onChangeImafe is invoked here but the function is defined at the time of component declaration
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.log('error reading image');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name={'camera'}
            color={colors.medium}
            size={40}
          />
        )}
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default ImageInput;

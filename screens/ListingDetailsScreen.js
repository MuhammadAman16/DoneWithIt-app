import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Image} from 'react-native-expo-image-cache';

import AppText from '../components/AppText';
import ContactSellerForm from '../components/ContactSellerForm';
import color from '../config/color';
import ListItem from '../components/ListItem';

function ListingDetailsScreen({route}) {
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
      <Image
        style={styles.image}
        preview={{uri: listing.images[0].thumbnailUrl}}
        tint={'light'}
        uri={listing.images[0].url}></Image>
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require('../assets/logo-red.png')}
            title="Muhammad Aman"
            subTitle="5 Listings"
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  detailsContainer: {padding: 20},
  image: {
    width: '100%',
    height: 200,
  },
  price: {
    color: color.secondary,
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  userContainer: {
    marginVertical: 40,
  },
});
export default ListingDetailsScreen;

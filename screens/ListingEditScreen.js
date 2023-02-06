import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import * as Yup from 'yup';
import * as Location from 'expo-location';

import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker,
} from '../components/forms/index';
import CategoryPickerItem from '../components/CategoryPickerItem';
import colors from '../config/color';
import FormImagePicker from '../components/forms/FormImagePicker';
import listingsApi from '../api/listings';
import UploadScreen from './UploadScreen';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select atleast one image'),
});

const categories = [
  {
    label: 'Furniture',
    value: 1,
    backgroundColor: colors.primary,
    icon: 'table-furniture',
  },
  {
    label: 'Clothing',
    value: 2,
    backgroundColor: '#E4572E',
    icon: 'tshirt-crew',
  },
  {
    label: 'Camera',
    value: 3,
    backgroundColor: '#52489C',
    icon: 'camera',
  },
  {
    label: 'Mobile',
    value: 4,
    backgroundColor: '#086375',
    icon: 'cellphone',
  },
  {
    label: 'Light',
    value: 5,
    backgroundColor: '#42BFDD',
    icon: 'lamp',
  },
  {
    label: 'Vehicles',
    value: 6,
    backgroundColor: colors.secondary,
    icon: 'car',
  },
];
export default function ListingEditScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progess, setProgess] = useState(0);

  // useEffect(() => {
  //   (async () => {
  //     let {status} = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const handleSubmit = async (listing, {resetForm}) => {
    setProgess(50);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      {...listing, location},
      progress => setProgess(progress),
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Could not save the listing');
    }
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progess}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: '',
          price: '',
          description: '',
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name={'title'} placeholder={'Title'} />
        <AppFormField
          keyboardType={'number-pad'}
          maxLength={8}
          name={'price'}
          placeholder={'Price'}
          width={120}
        />
        <AppFormPicker
          items={categories}
          name={'category'}
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name={'description'}
          numberOfLines={3}
          placeholder={'Description'}
        />
        <SubmitButton title={'Post'} />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

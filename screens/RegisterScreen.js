import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import * as Yup from 'yup';

import usersApi from '../api/users';
import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from '../components/forms/index';
import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import useApi from './hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen(props) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async userInfo => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occured');
        console.log(result);
      }
      return;
    }
    //renaming data to authToken
    const {data: authToken} = await loginApi.request(
      userInfo.email,
      userInfo.password,
    );
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <ErrorMessage visible={error} error={error} />
        <AppForm
          initialValues={{name: '', email: '', password: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <AppFormField
            autoCorrect={false}
            icon="account"
            name={'name'}
            placeholder="Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            name={'email'}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name={'password'}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title={'Register'} />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;

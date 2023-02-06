import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms/index';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setloginFailed] = useState(false);

  const handleSubmit = async ({email, password}) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setloginFailed(true);
    }
    setloginFailed(false);
    auth.logIn(result.data);
  };

  return (
    //Advantage of using formik is that it tracks the state by itself.
    // we dont have to use useState hook
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <AppForm
        initialValues={{email: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage
          error={'Invalid Email or Password'}
          visible={loginFailed}
        />
        <AppFormField
          name={'email'}
          autoCapitalize="none"
          auroCorrect={false}
          keyboardType={'email-address'}
          icon={'email'}
          placeholder="Email"
        />
        <AppFormField
          name={'password'}
          autoCapitalize="none"
          auroCorrect="false"
          icon="lock"
          placeholder="Password"
          secureTextEntry
        />
        <SubmitButton title={'LOGIN'} />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {padding: 10},

  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});
export default LoginScreen;

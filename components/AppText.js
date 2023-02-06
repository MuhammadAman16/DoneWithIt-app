import React from 'react';
import {Text} from 'react-native';

import styles from '../config/styles';

export default function AppText({children, style, ...otherProps}) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

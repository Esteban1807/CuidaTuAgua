import React from 'react';
import { View, Image, StyleSheet, ImageStyle } from 'react-native';
import { spacing } from '../../theme';

export default function LoginHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  image: {
    width: 260,
    height: 260,
  } as ImageStyle,
});
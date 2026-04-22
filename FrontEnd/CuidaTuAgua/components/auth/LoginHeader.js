import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

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

  },
  image: {
    width: 260,
    height: 260,
  },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@theme/index';
import Logo from '../common/Logo';

export default function LoginHeader() {
  return (
    <View style={styles.container}>
      <Logo width={260} height={260} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
});
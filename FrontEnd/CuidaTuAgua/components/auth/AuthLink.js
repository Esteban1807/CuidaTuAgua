import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthLink({ text, onPress = () => {}, center = false }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.link, center && styles.center]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 14,
    color: '#0B5FA5',
    marginBottom: 14,
    marginLeft: 6,
  },
  center: {
    textAlign: 'center',
    marginLeft: 0,
  },
});
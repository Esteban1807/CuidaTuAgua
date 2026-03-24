import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
}) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: 6,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 16,
  },
});
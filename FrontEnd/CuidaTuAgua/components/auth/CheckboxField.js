import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CheckboxField({
  checked,
  onPress = () => {},
  label,
  onLabelPress = () => {},
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onLabelPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  checkboxRow: {
    marginRight: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#0B5FA5',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  checkboxChecked: {
    backgroundColor: '#0B5FA5',
  },
  label: {
    fontSize: 15,
    color: '#0B3B70',
    textDecorationLine: 'underline',
  },
});
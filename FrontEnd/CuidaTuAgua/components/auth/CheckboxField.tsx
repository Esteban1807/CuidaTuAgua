import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

type Props = {
  checked: boolean;
  onPress: () => void;
  label: string;
  onLabelPress?: () => void;
};

export default function CheckboxField({
  checked,
  onPress,
  label,
  onLabelPress,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, checked && styles.checked]}
        onPress={onPress}
      />

      <TouchableOpacity onPress={onLabelPress || onPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.grayMedium,
    borderRadius: 4,
    marginRight: spacing.sm,
  },

  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
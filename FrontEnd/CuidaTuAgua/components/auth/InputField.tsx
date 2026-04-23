import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

type Props = TextInputProps & {
  label?: string;
};

export default function InputField({ label, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={colors.grayMedium}
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },

  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    height: 40,
  },
});
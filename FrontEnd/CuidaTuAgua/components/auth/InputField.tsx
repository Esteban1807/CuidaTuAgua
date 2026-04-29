import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
} from 'react-native';
import { useTheme, spacing, typography } from '../../theme';

type Props = TextInputProps & {
  label?: string;
};

export default function InputField({ label, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>}

      <TextInput
        {...props}
        style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary, backgroundColor: colors.surface }]}
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
    marginBottom: spacing.lg,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 40,
  },
});
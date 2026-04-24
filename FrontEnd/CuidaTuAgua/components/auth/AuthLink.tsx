import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

type Props = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  center?: boolean;
};

export default function AuthLink({
  text,
  onPress,
  center = false,
}: Props) {
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
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  center: {
    textAlign: 'center',
    marginLeft: 0,
  },
});
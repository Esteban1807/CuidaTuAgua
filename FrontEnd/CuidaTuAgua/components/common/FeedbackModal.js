import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export default function FeedbackModal({
  visible,
  title,
  message,
  type = 'info',
  onClose,
}) {
  const { colors } = useTheme();

  const typeStyles = {
    success: {
      titleColor: colors.success,
      buttonColor: colors.success,
    },
    error: {
      titleColor: colors.error,
      buttonColor: colors.error,
    },
    info: {
      titleColor: colors.primary,
      buttonColor: colors.primary,
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.info;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.title, { color: currentStyle.titleColor }]}> 
            {title}
          </Text>

          <Text style={[styles.message, { color: colors.textPrimary }]}> 
            {message}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentStyle.buttonColor }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
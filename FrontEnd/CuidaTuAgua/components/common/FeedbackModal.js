import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function FeedbackModal({
  visible,
  title,
  message,
  type = 'info',
  onClose,
}) {
  const typeStyles = {
    success: {
      titleColor: '#0F9D58',
      buttonColor: '#0F9D58',
    },
    error: {
      titleColor: '#D93025',
      buttonColor: '#D93025',
    },
    info: {
      titleColor: '#118FC3',
      buttonColor: '#118FC3',
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
        <View style={styles.modalContainer}>
          <Text style={[styles.title, { color: currentStyle.titleColor }]}>
            {title}
          </Text>

          <Text style={styles.message}>
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
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useResponsive } from '../../hooks/useResponsive';
import { colors, spacing, typography } from '../../theme';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function TermsModal({ visible, onClose }: Props) {
  const { isWeb } = useResponsive();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, isWeb && styles.modalContainerWeb]}>
          <Text style={styles.title}>Términos y Condiciones</Text>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.paragraph}>
              Bienvenido a CuidaTuAgua. Al registrarte y utilizar esta aplicación,
              aceptas hacer un uso adecuado de la plataforma y de la información
              suministrada.
            </Text>

            <Text style={styles.paragraph}>
              El usuario se compromete a proporcionar información veraz durante
              el proceso de registro, incluyendo sus datos personales, correo
              electrónico y la información del hogar asociado.
            </Text>

            <Text style={styles.paragraph}>
              CuidaTuAgua podrá mostrar información relacionada con el monitoreo,
              consumo y estado del agua del hogar registrado, con fines de
              consulta, seguimiento y gestión por parte del usuario.
            </Text>

            <Text style={styles.paragraph}>
              La aplicación protegerá la información personal del usuario según
              las políticas de tratamiento de datos aplicables. Sin embargo, el
              usuario es responsable de custodiar sus credenciales de acceso.
            </Text>

            <Text style={styles.paragraph}>
              El uso indebido de la plataforma, la falsedad en la información
              registrada o cualquier intento de afectar el funcionamiento del
              sistema podrá generar restricciones de acceso.
            </Text>

            <Text style={styles.paragraph}>
              Al aceptar estos términos y condiciones, el usuario autoriza el
              tratamiento de sus datos para el correcto funcionamiento de la
              aplicación y reconoce haber leído y comprendido la presente
              información.
            </Text>
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
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
    paddingHorizontal: spacing.xxl,
  },

  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    maxWidth: 500,
    padding: spacing.lg,
  },

  modalContainerWeb: {
    maxWidth: 700,
  },

  title: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  content: {
    marginBottom: spacing.lg,
  },

  paragraph: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  button: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '600',
  },
});
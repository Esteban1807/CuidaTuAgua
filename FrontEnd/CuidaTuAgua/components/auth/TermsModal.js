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

export default function TermsModal({ visible, onClose }) {
  const { isWeb } = useResponsive();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, isWeb && styles.modalContainerWeb ]}>
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
    height: '100%',
    paddingHorizontal: 50,
  },

  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    maxWidth: 500,
    padding: 20,  
  },
  modalContainerWeb: {
    maxWidth: 700,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B5FA5',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 14
  },
  button: {
    backgroundColor: '#118FC3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
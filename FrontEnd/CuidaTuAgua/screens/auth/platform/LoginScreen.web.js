import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import InputField from '../../../components/auth/InputField';
import AuthLink from '../../../components/auth/AuthLink';
import CheckboxField from '../../../components/auth/CheckboxField';
import PrimaryButton from '../../../components/auth/PrimaryButton';
import TermsModal from '../../../components/auth/TermsModal';
import FeedbackModal from '../../../components/common/FeedbackModal';

export default function LoginScreenWeb({
  identifier,
  setIdentifier,
  password,
  setPassword,
  acceptedTerms,
  setAcceptedTerms,
  termsVisible,
  setTermsVisible,
  handleLogin,
  showFeedback,
  feedbackVisible,
  feedbackTitle,
  feedbackMessage,
  feedbackType,
  closeFeedback,
  loading,
  goToRegister,
}) {
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.leftPanel}>
          <Text style={styles.title}>Iniciar sesión</Text>

          <InputField
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="Correo / Documento de identidad"
          />

          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
          />

          <AuthLink
            text="¿Olvidaste tu contraseña?"
            onPress={() =>
              showFeedback(
                'Recuperación',
                'Aquí irá el flujo de recuperación de contraseña.',
                'info'
              )
            }
          />

          <CheckboxField
            checked={acceptedTerms}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            label="Términos y Condiciones"
            onLabelPress={() => setTermsVisible(true)}
          />

          <AuthLink
            text="¿No tienes cuenta? Regístrate"
            onPress={goToRegister}
          />

          <PrimaryButton
            title={loading ? 'Cargando...' : 'Entrar'}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

        <View style={styles.rightPanel}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      <TermsModal
        visible={termsVisible}
        onClose={() => setTermsVisible(false)}
      />

      <FeedbackModal
        visible={feedbackVisible}
        title={feedbackTitle}
        message={feedbackMessage}
        type={feedbackType}
        onClose={closeFeedback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    width: '100%',
    maxWidth: 1100,
    minHeight: 520,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#DDF6FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0B5FA5',
    marginBottom: 24,
  },
  image: {
    width: 300,
    height: 300,
  },
});
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import LoginHeader from '../../../components/auth/LoginHeader';
import InputField from '../../../components/auth/InputField';
import AuthLink from '../../../components/auth/AuthLink';
import CheckboxField from '../../../components/auth/CheckboxField';
import PrimaryButton from '../../../components/auth/PrimaryButton';
import TermsModal from '../../../components/auth/TermsModal';
import FeedbackModal from '../../../components/common/FeedbackModal';

export default function LoginScreenMobile({
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <LoginHeader />
        </View>

        <View style={styles.formSection}>
          <InputField
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="Correo / Número de documento"
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
        </View>

        <View style={styles.footerSection}>
          <AuthLink
            text="¿No tienes cuenta? Regístrate aquí"
            onPress={goToRegister}
            center
          />

          <PrimaryButton
            title={loading ? 'Cargando...' : 'Acceder'}
            onPress={handleLogin}
            disabled={loading}
          />
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
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  headerSection: {
    flex: 1.2,
    justifyContent: 'center',
  },
  formSection: {
    flex: 1.3,
    justifyContent: 'center',
  },
  footerSection: {
    flex: 0.8,
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
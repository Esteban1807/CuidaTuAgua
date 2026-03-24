import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from 'react-native';
import InputField from '../../../components/auth/InputField';
import CheckboxField from '../../../components/auth/CheckboxField';
import PrimaryButton from '../../../components/auth/PrimaryButton';
import TermsModal from '../../../components/auth/TermsModal';
import FeedbackModal from '../../../components/common/FeedbackModal';

export default function RegisterScreenMobile({
  fullName,
  setFullName,
  document,
  setDocument,
  email,
  setEmail,
  password,
  setPassword,
  homeName,
  setHomeName,
  address,
  setAddress,
  stratum,
  setStratum,
  inhabitants,
  setInhabitants,
  acceptedTerms,
  setAcceptedTerms,
  termsVisible,
  setTermsVisible,
  handleRegister,
  loading,
  feedbackVisible,
  feedbackTitle,
  feedbackMessage,
  feedbackType,
  closeFeedback,
  goToLogin,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>

        <Text style={styles.section}>Datos del usuario</Text>
        <InputField value={fullName} onChangeText={setFullName} placeholder="Nombre completo" />
        <InputField value={document} onChangeText={setDocument} placeholder="Documento de identidad" />
        <InputField value={email} onChangeText={setEmail} placeholder="Correo electrónico" />
        <InputField value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />

        <Text style={styles.section}>Información del hogar</Text>
        <InputField value={homeName} onChangeText={setHomeName} placeholder="Nombre del hogar" />
        <InputField value={address} onChangeText={setAddress} placeholder="Dirección" />
        <InputField value={stratum} onChangeText={setStratum} placeholder="Estrato" />
        <InputField value={inhabitants} onChangeText={setInhabitants} placeholder="Habitantes" />

        <CheckboxField
          checked={acceptedTerms}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          label="Términos y Condiciones"
          onLabelPress={() => setTermsVisible(true)}
        />

        <PrimaryButton
          title={loading ? 'Registrando...' : 'Registrarse'}
          onPress={handleRegister}
          disabled={loading}
        />

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0B5FA5',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 8,
  },
});
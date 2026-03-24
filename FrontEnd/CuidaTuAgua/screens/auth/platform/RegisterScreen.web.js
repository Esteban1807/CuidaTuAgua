import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import InputField from '../../../components/auth/InputField';
import CheckboxField from '../../../components/auth/CheckboxField';
import PrimaryButton from '../../../components/auth/PrimaryButton';
import TermsModal from '../../../components/auth/TermsModal';
import FeedbackModal from '../../../components/common/FeedbackModal';

export default function RegisterScreenWeb({
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
    <View style={styles.page}>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.title}>Registro</Text>

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
        </ScrollView>

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
    maxWidth: 760,
    minHeight: 520,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 30,
  },
  form: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0B5FA5',
    marginBottom: 24,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 8,
  },
});

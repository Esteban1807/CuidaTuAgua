import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { useResponsive } from '../../hooks/useResponsive';

import InputField from '../../components/auth/InputField';
import CheckboxField from '../../components/auth/CheckboxField';
import PrimaryButton from '../../components/auth/PrimaryButton';
import TermsModal from '../../components/auth/TermsModal';
import FeedbackModal from '../../components/common/FeedbackModal';

type Props = {
  goToLogin: () => void;
};

type FeedbackType = 'info' | 'error' | 'success';

export default function RegisterScreen({ goToLogin }: Props) {
  const { isWeb } = useResponsive();
  const { register, loading } = useAuth();

  const [fullName, setFullName] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [homeName, setHomeName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [stratum, setStratum] = useState<string>('');
  const [inhabitants, setInhabitants] = useState<string>('');

  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [feedbackTitle, setFeedbackTitle] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('info');

  const showFeedback = (
    title: string,
    message: string,
    type: FeedbackType = 'info'
  ): void => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  const closeFeedback = (): void => {
    setFeedbackVisible(false);

    if (feedbackType === 'success' && goToLogin) {
      goToLogin();
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (!fullName.trim()) return showFeedback('Error', 'Ingresa tu nombre completo', 'error');
    if (!document.trim()) return showFeedback('Error', 'Ingresa tu documento', 'error');
    if (!email.trim()) return showFeedback('Error', 'Ingresa tu correo electrónico', 'error');
    if (!password.trim()) return showFeedback('Error', 'Ingresa tu contraseña', 'error');
    if (!homeName.trim()) return showFeedback('Error', 'Ingresa el nombre del hogar', 'error');
    if (!address.trim()) return showFeedback('Error', 'Ingresa la dirección del hogar', 'error');
    if (!stratum.trim()) return showFeedback('Error', 'Ingresa el estrato', 'error');
    if (!inhabitants.trim()) return showFeedback('Error', 'Ingresa la cantidad de habitantes', 'error');
    if (!acceptedTerms) return showFeedback('Error', 'Debes aceptar los términos y condiciones', 'error');

    const result = await register({
      fullName,
      document,
      email,
      password,
      homeName,
      address,
      stratum,
      inhabitants,
    });

    if (!result.success) {
      showFeedback('Error', result.message, 'error');
      return;
    }

    showFeedback(
      'Registro exitoso',
      'Tu cuenta fue creada. Debes validar tu correo antes de iniciar sesión.',
      'success'
    );
  };

  return (
    <View style={styles.safeArea}>
      <View style={[styles.page, isWeb && styles.pageWeb]}>
        <View style={[styles.container, isWeb && styles.card]}>
          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <TouchableOpacity onPress={goToLogin} style={styles.backButton}>
                <Image
                  source={require('../../assets/images/flecha-izquierda.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Registro</Text>
            </View>

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

          <TermsModal visible={termsVisible} onClose={() => setTermsVisible(false)} />

          <FeedbackModal
            visible={feedbackVisible}
            title={feedbackTitle}
            message={feedbackMessage}
            type={feedbackType}
            onClose={closeFeedback}
          />
        </View>
      </View>
    </View>
  );
}
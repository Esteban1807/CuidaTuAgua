import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageStyle,
} from 'react-native';

import { styles } from './RegisterScreen.styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const { isWeb, isMobile } = useResponsive();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [homeName, setHomeName] = useState('');
  const [address, setAddress] = useState('');
  const [stratum, setStratum] = useState('');
  const [inhabitants, setInhabitants] = useState('');

  const [termsVisible, setTermsVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('info');

  const showFeedback = (
    title: string,
    message: string,
    type: FeedbackType = 'info'
  ) => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  const closeFeedback = () => {
    setFeedbackVisible(false);

    if (feedbackType === 'success') {
      goToLogin();
    }
  };

  const handleRegister = () => {
    if (!fullName.trim()) return showFeedback('Error', 'Ingresa tu nombre completo', 'error');
    if (!document.trim()) return showFeedback('Error', 'Ingresa tu documento', 'error');
    if (!email.trim()) return showFeedback('Error', 'Ingresa tu correo electrónico', 'error');
    if (!password.trim()) return showFeedback('Error', 'Ingresa tu contraseña', 'error');
    if (!homeName.trim()) return showFeedback('Error', 'Ingresa el nombre del hogar', 'error');
    if (!address.trim()) return showFeedback('Error', 'Ingresa la dirección', 'error');
    if (!stratum.trim()) return showFeedback('Error', 'Ingresa el estrato', 'error');
    if (!inhabitants.trim()) return showFeedback('Error', 'Ingresa habitantes', 'error');
    if (!acceptedTerms) return showFeedback('Error', 'Debes aceptar los términos', 'error');

    // 🔥 Simulación de registro exitoso
    showFeedback(
      'Registro exitoso',
      'Cuenta creada correctamente',
      'success'
    );
  };

  return (
    <View
      style={[
        styles.safeArea,
        isMobile && styles.safeAreaMobile,
        { paddingTop: insets.top },
      ]}
    >
      <View style={[styles.page, isWeb && styles.pageWeb]}>
        <View style={[styles.container, isWeb && styles.card]}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 140 + insets.bottom,
            }}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={goToLogin} style={styles.backButton}>
                <Image
                  source={require('../../assets/images/flecha-izquierda.png')}
                  style={styles.backIcon as ImageStyle}
                />
              </TouchableOpacity>

              <Text style={styles.title}>Registro</Text>
            </View>

            <Text style={styles.section}>Datos del usuario</Text>
            <InputField value={fullName} onChangeText={setFullName} placeholder="Nombre completo" />
            <InputField value={document} onChangeText={setDocument} placeholder="Documento" />
            <InputField value={email} onChangeText={setEmail} placeholder="Correo" />
            <InputField value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />

            <Text style={styles.section}>Información del hogar</Text>
            <InputField value={homeName} onChangeText={setHomeName} placeholder="Nombre hogar" />
            <InputField value={address} onChangeText={setAddress} placeholder="Dirección" />
            <InputField value={stratum} onChangeText={setStratum} placeholder="Estrato" />
            <InputField value={inhabitants} onChangeText={setInhabitants} placeholder="Habitantes" />

            <CheckboxField
              checked={acceptedTerms}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              label="Términos y Condiciones"
              onLabelPress={() => setTermsVisible(true)}
            />
          </ScrollView>

          <View
            style={[
              styles.footer,
              { paddingBottom: insets.bottom + 16 },
            ]}
          >
            <PrimaryButton
              title="Registrarse"
              onPress={handleRegister}
            />
          </View>

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
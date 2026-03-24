import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import RegisterScreenMobile from './platform/RegisterScreen.mobile';
import RegisterScreenWeb from './platform/RegisterScreen.web';

export default function RegisterScreen({ goToLogin }) {
  const { register, loading } = useAuth();

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
  const [feedbackType, setFeedbackType] = useState('info');

  const showFeedback = (title, message, type = 'info') => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  const closeFeedback = () => {
    setFeedbackVisible(false);

    // Si el registro fue exitoso, volver al login
    if (feedbackType === 'success' && goToLogin) {
      goToLogin();
    }
  };

  const handleRegister = async () => {
    if (!fullName.trim()) {
      showFeedback('Error', 'Ingresa tu nombre completo', 'error');
      return;
    }

    if (!document.trim()) {
      showFeedback('Error', 'Ingresa tu documento', 'error');
      return;
    }

    if (!email.trim()) {
      showFeedback('Error', 'Ingresa tu correo electrónico', 'error');
      return;
    }

    if (!password.trim()) {
      showFeedback('Error', 'Ingresa tu contraseña', 'error');
      return;
    }

    if (!homeName.trim()) {
      showFeedback('Error', 'Ingresa el nombre del hogar', 'error');
      return;
    }

    if (!address.trim()) {
      showFeedback('Error', 'Ingresa la dirección del hogar', 'error');
      return;
    }

    if (!stratum.trim()) {
      showFeedback('Error', 'Ingresa el estrato', 'error');
      return;
    }

    if (!inhabitants.trim()) {
      showFeedback('Error', 'Ingresa la cantidad de habitantes', 'error');
      return;
    }

    if (!acceptedTerms) {
      showFeedback(
        'Error',
        'Debes aceptar los términos y condiciones',
        'error'
      );
      return;
    }

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

  const sharedProps = {
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
    showFeedback,
    feedbackVisible,
    feedbackTitle,
    feedbackMessage,
    feedbackType,
    closeFeedback,
    goToLogin,
  };

  if (Platform.OS === 'web') {
    return <RegisterScreenWeb {...sharedProps} />;
  }

  return <RegisterScreenMobile {...sharedProps} />;
}
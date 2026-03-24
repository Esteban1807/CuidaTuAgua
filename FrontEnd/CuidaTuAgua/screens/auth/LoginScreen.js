import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import LoginScreenMobile from './platform/LoginScreen.mobile';
import LoginScreenWeb from './platform/LoginScreen.web';

export default function LoginScreen({goToRegister}) {
  const { login, loading } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

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
  };

  const handleLogin = async () => {
    if (!identifier.trim()) {
      showFeedback('Error', 'Ingresa tu correo o número de documento', 'error');
      return;
    }

    if (!password.trim()) {
      showFeedback('Error', 'Ingresa tu contraseña', 'error');
      return;
    }

    if (!acceptedTerms) {
      showFeedback('Error', 'Debes aceptar los términos y condiciones', 'error');
      return;
    }

    const result = await login({ identifier, password });

    if (!result.success) {
      showFeedback('Error', result.message, 'error');
      return;
    }

    showFeedback('Éxito', 'Inicio de sesión correcto', 'success');
    
  };
  
  

  const sharedProps = {
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
  };

  if (Platform.OS === 'web') {
    return <LoginScreenWeb {...sharedProps} />;
  }

  return <LoginScreenMobile {...sharedProps} />;
}
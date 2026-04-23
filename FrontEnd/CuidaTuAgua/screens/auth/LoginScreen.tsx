import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
} from 'react-native';

import { styles } from './LoginScreen.styles';

import { useAuth } from '../../hooks/useAuth';
import LoginHeader from '../../components/auth/LoginHeader';
import InputField from '../../components/auth/InputField';
import AuthLink from '../../components/auth/AuthLink';
import PrimaryButton from '../../components/auth/PrimaryButton';
import TermsModal from '../../components/auth/TermsModal';
import FeedbackModal from '../../components/common/FeedbackModal';
import { useResponsive } from '../../hooks/useResponsive';

type Props = {
  goToRegister: () => void;
};

type FeedbackType = 'info' | 'error' | 'success';

type CarouselItem = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

export default function LoginScreen({ goToRegister }: Props) {
  const { login, loading, setIsAuthenticated } = useAuth();
  const { isWeb, isMobile, width } = useResponsive();

  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);

  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slideAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(1)).current;

  const carouselItems: CarouselItem[] = [
    {
      image: require('../../assets/images/Imagen1.jpg'),
      title: 'Bienvenido',
      description: 'Controla tu consumo de agua con datos y alertas en tiempo real.',
    },
    {
      image: require('../../assets/images/Imagen2.jpg'),
      title: 'Ahorra agua',
      description: 'Conoce tus hábitos y reduce el consumo con recomendaciones sencillas.',
    },
    {
      image: require('../../assets/images/Imagen3.jpg'),
      title: 'Monitorea',
      description: 'Recibe reportes claros sobre tu uso y mantén tu hogar más sostenible.',
    },
  ];

  const carouselWidth: number = Math.min(500, width * 0.3);

  const animateSlide = (newIndex: number): void => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: newIndex > activeSlide ? -50 : 50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveSlide(newIndex);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const goToNextSlide = (): void => {
    const nextIndex = (activeSlide + 1) % carouselItems.length;
    animateSlide(nextIndex);
  };

  const goToPrevSlide = (): void => {
    const prevIndex = activeSlide === 0 ? carouselItems.length - 1 : activeSlide - 1;
    animateSlide(prevIndex);
  };

  const useAutoplay = (): void => {
    useEffect(() => {
      const interval = setInterval(goToNextSlide, 5000);
      return () => clearInterval(interval);
    }, [activeSlide]);
  };

  useAutoplay();

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

  // const handleLogin = async () => {
  //   if (!identifier.trim()) {
  //     showFeedback('Error', 'Ingresa tu correo o número de documento', 'error');
  //     return;
  //   }
  //   if (!password.trim()) {
  //     showFeedback('Error', 'Ingresa tu contraseña', 'error');
  //     return;
  //   }
  //   if (!acceptedTerms) {
  //     showFeedback('Error', 'Debes aceptar los términos y condiciones', 'error');
  //     return;
  //   }
  //   const result = await login({ identifier, password });
  //   if (!result.success) {
  //     showFeedback('Error', result.message, 'error');
  //     return;
  //   }
  //   showFeedback('Éxito', 'Inicio de sesión correcto', 'success');
  // };

  const closeFeedback = (): void => {
    setFeedbackVisible(false);
  };

  const handleLogin = (): void => {
    setIsAuthenticated(true);
  };

  return (
    <View style={[styles.safeArea, isWeb && styles.webSafeArea]}>
      <View style={[styles.container, isWeb && styles.webContainer]}>
        <View style={[styles.formSection, isWeb && styles.webForm, isMobile && styles.mobileForm]}>
          <View style={styles.headerSection}>
            <LoginHeader />

            <View style={isMobile && styles.mobileFormFields}>
              <InputField value={identifier} onChangeText={setIdentifier} placeholder="Correo / Número de documento" />
              <InputField value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />

              <View style={[isWeb && styles.webAuthLink]}>
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

                <AuthLink text="¿No tienes cuenta? Regístrate" onPress={goToRegister} />
              </View>
            </View>
          </View>

          <View style={[isMobile && styles.mobileButton, isWeb && styles.webButton]}>
            <PrimaryButton
              title={loading ? 'Cargando...' : 'Acceder'}
              onPress={handleLogin}
              disabled={loading}
            />
          </View>
        </View>

        {isWeb && (
          <View style={styles.rightPanel}>
            <View style={styles.carouselRow}>
              <TouchableOpacity style={styles.leftArrow} onPress={goToPrevSlide}>
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <View style={[styles.carouselItem, { width: carouselWidth }]}>
                <Animated.Image
                  source={carouselItems[activeSlide].image}
                  style={[
                    styles.carouselImage,
                    { transform: [{ translateX: slideAnim }], opacity: fadeAnim },
                  ]}
                />
                <Animated.Text style={[styles.carouselTitle, { opacity: fadeAnim }]}>
                  {carouselItems[activeSlide].title}
                </Animated.Text>
                <Animated.Text style={[styles.carouselDescription, { opacity: fadeAnim }]}>
                  {carouselItems[activeSlide].description}
                </Animated.Text>
              </View>

              <TouchableOpacity style={styles.rightArrow} onPress={goToNextSlide}>
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  );
}
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
} from 'react-native';

import { styles } from './LoginScreen.styles';

import LoginHeader from '../../components/auth/LoginHeader';
import InputField from '../../components/auth/InputField';
import AuthLink from '../../components/auth/AuthLink';
import PrimaryButton from '../../components/auth/PrimaryButton';
import TermsModal from '../../components/auth/TermsModal';
import FeedbackModal from '../../components/common/FeedbackModal';
import { useResponsive } from '../../hooks/useResponsive';

type Props = {
  goToRegister: () => void;
  onLoginSuccess: () => void;
};

type FeedbackType = 'info' | 'error' | 'success';

type CarouselItem = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

export default function LoginScreen({ goToRegister, onLoginSuccess }: Props) {
  const { isWeb, isMobile, width } = useResponsive();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [termsVisible, setTermsVisible] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('info');

  const [activeSlide, setActiveSlide] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

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

  const carouselWidth = Math.min(500, width * 0.3);

  const animateSlide = (newIndex: number) => {
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

  const goToNextSlide = () => {
    const nextIndex = (activeSlide + 1) % carouselItems.length;
    animateSlide(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex =
      activeSlide === 0 ? carouselItems.length - 1 : activeSlide - 1;
    animateSlide(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

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
  };

  const handleLogin = () => {
    if (!identifier.trim()) {
      return showFeedback('Error', 'Ingresa tu usuario', 'error');
    }

    if (!password.trim()) {
      return showFeedback('Error', 'Ingresa tu contraseña', 'error');
    }

    // 🔥 Simulación login
    onLoginSuccess();
  };

  return (
    <View style={[styles.safeArea, isWeb && styles.webSafeArea]}>
      <View style={[styles.container, isWeb && styles.webContainer]}>
        
        {/* FORM */}
        <View
          style={[
            styles.formSection,
            isWeb && styles.webForm,
            isMobile && styles.mobileForm,
          ]}
        >
          <View>
            <LoginHeader />

            <View style={isMobile && styles.mobileFormFields}>
              <InputField
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="Correo / Documento"
              />

              <InputField
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                secureTextEntry
              />

              <View style={[isWeb && styles.webAuthLink]}>
                <AuthLink
                  text="¿Olvidaste tu contraseña?"
                  onPress={() =>
                    showFeedback(
                      'Recuperación',
                      'Funcionalidad no implementada',
                      'info'
                    )
                  }
                />

                <AuthLink
                  text="¿No tienes cuenta? Regístrate"
                  onPress={goToRegister}
                />
              </View>
            </View>
          </View>

          <View style={[isMobile && styles.mobileButton]}>
            <PrimaryButton
              title="Acceder"
              onPress={handleLogin}
            />
          </View>
        </View>

        {/* CAROUSEL WEB */}
        {isWeb && (
          <View style={styles.rightPanel}>
            <View style={styles.carouselRow}>
              <TouchableOpacity
                style={styles.leftArrow}
                onPress={goToPrevSlide}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <View style={[styles.carouselItem, { width: carouselWidth }]}>
                <Animated.Image
                  source={carouselItems[activeSlide].image}
                  style={[
                    styles.carouselImage,
                    {
                      transform: [{ translateX: slideAnim }],
                      opacity: fadeAnim,
                    },
                  ]}
                />

                <Animated.Text
                  style={[styles.carouselTitle, { opacity: fadeAnim }]}
                >
                  {carouselItems[activeSlide].title}
                </Animated.Text>

                <Animated.Text
                  style={[styles.carouselDescription, { opacity: fadeAnim }]}
                >
                  {carouselItems[activeSlide].description}
                </Animated.Text>
              </View>

              <TouchableOpacity
                style={styles.rightArrow}
                onPress={goToNextSlide}
              >
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
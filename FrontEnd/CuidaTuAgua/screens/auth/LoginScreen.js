import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Animated} from 'react-native';


import { useAuth } from '../../hooks/useAuth';
import LoginHeader from '../../components/auth/LoginHeader';
import InputField from '../../components/auth/InputField';
import AuthLink from '../../components/auth/AuthLink';
import CheckboxField from '../../components/auth/CheckboxField';
import PrimaryButton from '../../components/auth/PrimaryButton';
import TermsModal from '../../components/auth/TermsModal';
import FeedbackModal from '../../components/common/FeedbackModal';
import { useResponsive } from '../../hooks/useResponsive';

export default function LoginScreen({ goToRegister }) {
  const { login, loading, setIsAuthenticated } = useAuth();
  const { isWeb, isMobile, width } = useResponsive();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const carouselItems = [
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

  const animateSlide = (newIndex) => {
    // Animación de salida
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
      // Animación de entrada
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
    const prevIndex = activeSlide === 0 ? carouselItems.length - 1 : activeSlide - 1;
    animateSlide(prevIndex);
  };

  const useAutoplay = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }, [activeSlide]);
  };

  useAutoplay();

  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('info');

  const showFeedback = (title, message, type = 'info') => {
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


  const closeFeedback = () => {
    setFeedbackVisible(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <View style={[styles.safeArea, isWeb && styles.webSafeArea]}>
      <View style={[styles.container, isWeb && styles.webContainer]}>

        <View style={[styles.formSection, isWeb && styles.webForm, isMobile && styles.mobileForm]}>
          <View style={styles.headerSection}>
            <LoginHeader />
            
            <View style={isMobile && styles.mobileFormFields}>
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

                  <AuthLink
                    text="¿No tienes cuenta? Regístrate"
                    onPress={goToRegister}
                  />
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
              <TouchableOpacity
                style={styles.leftArrow}
                onPress={goToPrevSlide}
                activeOpacity={0.8}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <View style={[styles.carouselItem, { width: carouselWidth }]}>
                <View style={styles.imageContainer}>
                  <Animated.Image
                    source={carouselItems[activeSlide].image}
                    style={[
                      styles.carouselImage,
                      {
                        transform: [{ translateX: slideAnim }],
                        opacity: fadeAnim,
                      }
                    ]}
                 
                  />
                </View>
                <Animated.Text
                  style={[
                    styles.carouselTitle,
                    {
                      transform: [{ translateX: slideAnim }],
                      opacity: fadeAnim,
                    }
                  ]}
                >
                  {carouselItems[activeSlide].title}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.carouselDescription,
                    {
                      transform: [{ translateX: slideAnim }],
                      opacity: fadeAnim,
                    }
                  ]}
                >
                  {carouselItems[activeSlide].description}
                </Animated.Text>
              </View>

              <TouchableOpacity
                style={styles.rightArrow}
                onPress={goToNextSlide}
                activeOpacity={0.8}
              >
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.carouselDots}>
              {carouselItems.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => animateSlide(index)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.carouselDot,
                      index === activeSlide && styles.carouselDotActive,
                    ]}
                  />
                </TouchableOpacity>
              ))}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  
  webSafeArea: {
    padding: 50,
  },

  container: {
    flex: 1,
  },

  webContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
    flexDirection: 'row',
    maxWidth: 1200,
    maxHeight: '90vh',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    minHeight: 520,
  },

  formSection: {
    flex: 1,
    paddingHorizontal:20,
    justifyContent: 'space-between',
  },

  webForm: {
    paddingHorizontal: 20,
    flex: 0.65,
    maxWidth: 600,
  },

  mobileForm: {
    paddingTop: 50,
  },

  mobileFormFields: {
    marginTop: 30,
  },
  
  webButton: {
    bottom: 10,
  },

  mobileButton: {
    bottom: 30,
  },

  webAuthLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginRight: 16,
  },

  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%',
    maxWidth: 600,
  },
  carouselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  leftArrow: {
    width: 40,
    height: 40, 
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  rightArrow: {
    width: 40, 
    height: 40,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A6D95',
    paddingTop: 2,
  },  

  carouselContent: {
    alignItems: 'center',
    justifyContent: 'center',  
  },
  
  carouselImage: {
    width: '70%',
    height: 290,
    borderRadius: 20,
  },
  carouselTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#0A6D95',
    textAlign: 'center',
  },
  carouselDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#0B5FA5',
    textAlign: 'center',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 6,
  },
  carouselDotActive: {
    backgroundColor: '#118FC3',
  },
});

import React from 'react';
import { useEffect } from 'react';
import { View, Image, ImageStyle, TouchableOpacity, Text, ScrollView, FlatList, Dimensions,} from 'react-native';
import { BlurView } from 'expo-blur';
import { VideoView, useVideoPlayer  } from 'expo-video';

import {useResponsive} from '../hooks/useResponsive';
import { styles } from './LandingScreen.styles';
import PrimaryButton from '../components/auth/PrimaryButton';
import LanguageSelector from '../components/common/LenguageSelector';
import FeatureCard from '../components/common/FeatureCard';  

type Props = {
  onAccess: () => void;
};

const LandingScreen = ({ onAccess }: any) => {
    const {isWeb, isMobile} = useResponsive();

    //Navbar Options
    const SECCIONES = [
        { id: '1', title: 'Características' },
        { id: '2', title: '¿Cómo Funciona?' },
        { id: '3', title: 'Beneficios' },
    ];
    
    const player = useVideoPlayer(
        require('../assets/videos/water-fluid.mp4'),
        (player) => {
            player.loop = true;
            player.muted = true;
            player.play();
        }
    );  

    useEffect(() => {
        player.play();
        }, []
    );

    const { width } = Dimensions.get('window');

    const features = [
    {
        id: '1',
        icon: 'bar-chart',
        iconColor: '#3B82F6',
        iconBg: '#EFF6FF',
        title: 'Análisis en Tiempo Real',
        description: 'Visualiza tu consumo de agua instantáneamente con gráficos y estadísticas detalladas.',
    },
    {
        id: '2',
        icon: 'notifications',
        iconColor: '#EF4444',
        iconBg: '#FEF2F2',
        title: 'Alertas Inteligentes',
        description: 'Recibe notificaciones sobre consumo anormal, posibles fugas o gastos elevados.',
    },
    {
        id: '3',
        icon: 'phone-portrait',
        iconColor: '#10B981',
        iconBg: '#ECFDF5',
        title: 'Acceso Móvil',
        description: 'Consulta tus datos desde cualquier dispositivo, en cualquier momento y lugar.',
    },
    {
        id: '4',
        icon: 'trending-down',
        iconColor: '#F97316',
        iconBg: '#FFF7ED',
        title: 'Reducción de Costos',
        description: 'Identifica oportunidades de ahorro y reduce tu factura mensual.',
    },
    {
        id: '5',
        icon: 'shield-checkmark',
        iconColor: '#8B5CF6',
        iconBg: '#F5F3FF',
        title: 'Datos Seguros',
        description: 'Tu información protegida con los más altos estándares de seguridad.',
    },
    {
        id: '6',
        icon: 'time',
        iconColor: '#06B6D4',
        iconBg: '#ECFEFF',
        title: 'Historial Completo',
        description: 'Accede a todo tu historial de consumo cuando lo necesites.',
    },
    ];

  return (
    <View style={styles.safeArea}>
        <View style={styles.navContainer}>
            <BlurView intensity={70} tint="light" style={styles.blur}>
                <View style={styles.nav}>  
                    <TouchableOpacity style={styles.logo}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/images/logo.png')} style={styles.logoImage as ImageStyle}/>
                            {isWeb && (
                                <Text style={styles.logoTitle}>Cuida Tu Agua</Text>)}
                        </View>
                    </TouchableOpacity>
                     <View style={styles.navContent}>
                        {isWeb ? (
                            SECCIONES.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.navButton}>
                                <Text style={styles.navContentText}>{item.title}</Text>
                            </TouchableOpacity>)
                            )
                        ):(
                            //Menu mobile beta
                            <TouchableOpacity style={styles.menuIconMobile}>
                                <Text>☰</Text> {/* Aquí podrías poner un icono de menú hamburguesa */}
                            </TouchableOpacity>
                            )}
                    </View>
                    <View style={styles.actions}>
                        <LanguageSelector style={styles.languageSelectorWrapper} />
                        <PrimaryButton
                            title="Acceder"
                            onPress={onAccess}
                            style={styles.accessButton}
                        />
                    </View>
                </View>
            </BlurView>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
           <View style={styles.carouselContainer}>
            
                <VideoView
                    style={styles.video}
                    player={player}
                    contentFit="cover"
                    allowsPictureInPicture={false}
                    nativeControls={false}
                />

                <View style={styles.overlay}/>

                <View style={styles.carouselTextContainer}>
                    <Text style={[styles.carouselTitle, isMobile && styles.mobileCarouselTitle]}>Monitorea y Controla el Consumo de Agua en tu Hogar</Text>
                    <Text style={styles.carouselDescription}>
                    Sistema innovador de registro y monitoreo del consumo de agua en tiempo real. Ahorra dinero, cuida el medio ambiente y toma el control de tus recursos hídricos.
                    </Text>
                </View>

            </View>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Características Principales</Text>
                <Text style={styles.contentDescription}>Todo lo que necesitas para tener el control total del agua en tu hogar</Text>
                
                  <FlatList
                    data={features}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.row}
                    renderItem={({ item }) => (
                    <FeatureCard
                        icon={item.icon}
                        iconColor={item.iconColor}
                        iconBg={item.iconBg}
                        title={item.title}
                        description={item.description}
                    />
                    )}
                />
            </View>
        </ScrollView>
    </View>
  );
};

export default LandingScreen;


import React from 'react';
import { useEffect } from 'react';
import { View, Image, ImageStyle, TouchableOpacity, Text, ScrollView, FlatList, Dimensions,} from 'react-native';
import { BlurView } from 'expo-blur';
import { VideoView, useVideoPlayer  } from 'expo-video';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation('landing');
    //Navbar Options
    const SECCIONES = [
        { id: '1', key: 'navbar.features' },
        { id: '2', key: 'navbar.howItWorks' },
        { id: '3', key: 'navbar.contact' },
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

   
    const FEATURE_UI  = [
        { id: '1', icon: 'bar-chart', iconColor: '#3B82F6', iconBg: '#EFF6FF' },
        { id: '2', icon: 'notifications', iconColor: '#EF4444', iconBg: '#FEF2F2' },
        { id: '3', icon: 'phone-portrait', iconColor: '#10B981', iconBg: '#ECFDF5' },
        { id: '4', icon: 'trending-down', iconColor: '#F97316', iconBg: '#FFF7ED' },
        { id: '5', icon: 'shield-checkmark', iconColor: '#8B5CF6', iconBg: '#F5F3FF' },
        { id: '6', icon: 'time', iconColor: '#06B6D4', iconBg: '#ECFEFF' },
    ];

    type FeatureText = {
        id: string;
        title: string;
        description: string;
    };

    const translatedItems = t('feature-characteristics.items', {
        returnObjects: true,
    }) as FeatureText[];

    

    const features = FEATURE_UI.map(ui => {
    const text = translatedItems.find((item: FeatureText) => item.id === ui.id);

    return {
        ...ui,
        title: text?.title || '',
        description: text?.description || '',
    };
    });

  return (
    <View style={styles.safeArea}>
        <View style={styles.navContainer}>
            <BlurView intensity={70} tint="light" style={styles.blur}>
                <View style={styles.nav}>  
                    <TouchableOpacity style={styles.logo}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/images/logo.png')} style={styles.logoImage as ImageStyle}/>
                            {isWeb && (
                                <Text style={styles.logoTitle}>{t('navbar.title')}</Text>)}
                        </View>
                    </TouchableOpacity>
                     <View style={styles.navContent}>
                        {isWeb ? (
                            SECCIONES.map(sec => (
                            <TouchableOpacity key={sec.id} style={styles.navButton}>
                                <Text style={styles.navContentText}>{t(sec.key)}</Text>
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
                            title={t('navbar.accessButton')}
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
                    <Text style={[styles.carouselTitle, isMobile && styles.mobileCarouselTitle]}>{t('carousel.slide1.title')}</Text>
                    <Text style={styles.carouselDescription}>{t('carousel.slide1.description')}</Text>
                </View>

            </View>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>{t('feature-characteristics.title')}</Text>
                <Text style={styles.contentDescription}>{t('feature-characteristics.description')}</Text>
                
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
                        title={t(item.title)}
                        description={t(item.description)}
                    />
                    )}  
                />
                
            </View>
        </ScrollView>
    </View>
  );
};

export default LandingScreen;


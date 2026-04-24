import React from 'react';
import { View, Button, Image, ImageStyle, TouchableOpacity, Text,} from 'react-native';
import { BlurView } from 'expo-blur';

import {useResponsive} from '../hooks/useResponsive';
import { styles } from './LandingScreen.styles';
import PrimaryButton from '../components/auth/PrimaryButton';

type Props = {
  onAccess: () => void;
};

const LandingScreen = ({ onAccess }: any) => {
    const {isWeb} = useResponsive();
  return (
    <View style={styles.safeArea}>
        <BlurView intensity={90}>
            <View style={styles.nav}>  
                <TouchableOpacity style={styles.logo}>
                    <View style={styles.logo}>
                        <Image source={require('../assets/images/logo.png')} style={styles.logoImage as ImageStyle}/>
                        {isWeb && 
                            <Text style={styles.logoTitle}>Cuida Tu Agua</Text>
                        }
                    </View>
                </TouchableOpacity>
                <View style={styles.access}>
                    <PrimaryButton
                        title="Acceder"
                        onPress={onAccess}
                        style={styles.accessButton}
                    />
                </View>
            </View> 
        </BlurView>
       
    </View>
  );
};

export default LandingScreen;


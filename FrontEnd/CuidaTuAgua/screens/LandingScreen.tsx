import React from 'react';
import { View, Button, Image, ImageStyle, TouchableOpacity, Text,} from 'react-native';
import { BlurView } from 'expo-blur';

import { styles } from './LandingScreen.styles';

type Props = {
  onAccess: () => void;
};

const LandingScreen = ({ onAccess }: any) => {
  return (
    <View style={styles.safeArea}>
        <BlurView intensity={90}>
            <View style={styles.nav}>  
                <TouchableOpacity style={styles.logo}>
                    <View style={styles.logo}>
                        <Image source={require('../assets/images/logo.png')} style={styles.logoImage as ImageStyle}/>
                        <Text style={styles.logoTitle}>Cuida Tu Agua</Text>
                    </View>
                    <View style={styles.title}>
                        
                    </View>
                </TouchableOpacity>
            </View>
        </BlurView>
        <View style={styles.acceder}>
        <Button
            title="Acceder"
            onPress={onAccess}
        />
        </View>
    </View>
  );
};

export default LandingScreen;


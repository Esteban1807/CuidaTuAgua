import React from 'react';
import { View, Button, Image, ImageStyle, TouchableOpacity } from 'react-native';

import { styles } from './LandingScreen.styles';

type Props = {
  onAccess: () => void;
};

const LandingScreen = ({ onAccess }: any) => {
  return (
    <View style={styles.safeArea}>
        <View style={styles.nav}>  
            <TouchableOpacity style={styles.nav}>
                <View style={styles.logo}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logoImage as ImageStyle}/>
                </View>
            </TouchableOpacity>
        </View>
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


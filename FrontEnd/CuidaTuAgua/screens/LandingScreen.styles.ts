import { StyleSheet } from 'react-native';
import { colors} from '../theme/Colors';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    nav: {
        height: 70,
       
    },
    logo:{
        flex: 1,
    },
    logoImage: {
        width: 120,
        height: 80,
        resizeMode: 'contain',
        justifyContent: 'center',
        
    },
    acceder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
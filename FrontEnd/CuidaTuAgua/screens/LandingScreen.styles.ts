import { StyleSheet } from 'react-native';
import { colors, spacing, typography} from '../theme/index';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    nav: {
        height: 80,
        
      
    },
    logo:{
        flex: 1,
        maxWidth: 500,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: 80,
        height: 70,
        resizeMode: 'contain',        
    },

    logoTitle:{
        ...typography.title,
        color: colors.textSecondary,
        
    },
    title:{

    },
    
    acceder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
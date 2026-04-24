import { StyleSheet } from 'react-native';
import { colors, spacing, typography} from '../theme/index';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    nav: {
        height: 80,
        flexDirection: 'row',
        flex: 1,
        padding: spacing.sm,
    },
    logo:{
        
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
    
    access: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        left: '85%',
        position: 'absolute',

    },

    accessButton: {
        minWidth: 150,
    },
});
import { StyleSheet } from 'react-native';
import { ThemeColors, spacing, typography } from '../theme/index';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  safeArea: {
        flex: 1,
        backgroundColor: colors.surface,
        
    },
    navContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },

    blur: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.35)',
    },

    nav: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.sm,
        width: '100%',
    },

    logo:{
        maxWidth: 500,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logoImage: {
        width: 70,
        height: 60,
        resizeMode: 'contain',        
    },

    logoTitle:{
        ...typography.title,
        color: colors.textPrimary,  
    },

    navContent: {
        flex:1,
        flexDirection: 'row',
        left: spacing.lg,
    },  

    navContentText: {
        fontSize: 15,
        fontWeight: '600' as const,
        paddingHorizontal: spacing.lg,
        color: colors.textPrimary,
         
    },
    navButton: {},

    menuIconMobile:{},
    
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        right: spacing.lg,
    },

    languageSelectorWrapper: {
        marginRight: spacing.sm,
    },

    themeToggleWrapper: {
        marginRight: spacing.sm,
    },

    access: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    accessButton: {
        minWidth: 100,
        maxHeight: 40,
    },

    scrollContent: {
        paddingTop: 65,
        height: '100%'
    },

    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 400,
        position: 'relative',
        overflow: 'hidden',
    },

    video: {
       
        width: '100%',
        height: 700,
    },

    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    carouselTextContainer: {
        position:'absolute',
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    carouselTitle: {
        fontSize: 90,
        fontWeight: '700' as const,
    },
    
    mobileCarouselTitle: {
        fontSize: 50,
    },

    carouselDescription: {},

    content:{
        padding: 16,
    },

    row: {
        gap: 16,
        marginBottom: 16,
    },

    sectionContainer: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: colors.grayLight,
    },
    sectionHeading: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: 12,
    },
    sectionSubheading: {
        fontSize: 15,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 36,
        paddingHorizontal: 8,
    },
});
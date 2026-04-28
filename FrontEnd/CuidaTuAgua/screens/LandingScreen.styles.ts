import { StyleSheet } from 'react-native';
import { colors, spacing, typography} from '../theme/index';

export const styles = StyleSheet.create({
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
        fontSize: 80,
        fontWeight: '700' as const,
    },
    
    mobileCarouselTitle: {
        fontSize: 50,
    },

    carouselDescription: {},

    content:{
        padding: 16,
    },

    contentTitle:{
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },

  contentDescription:{
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  row: {
    gap: 16,
    marginBottom: 16,
  },
});
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  
  webSafeArea: {
    padding: 50,
  },

  container: {
    flex: 1,
  },

  webContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
    flexDirection: 'row',
    maxWidth: 1200,
    maxHeight: '90vh',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    minHeight: 520,
  },

  formSection: {
    flex: 1,
    paddingHorizontal:20,
    justifyContent: 'space-between',
  },

  webForm: {
    paddingHorizontal: 20,
    flex: 0.65,
    maxWidth: 600,
  },

  mobileForm: {
    paddingTop: 50,
  },

  mobileFormFields: {
    marginTop: 30,
  },
  
  webButton: {
    bottom: 10,
  },

  mobileButton: {
    bottom: 30,
  },

  webAuthLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginRight: 16,
  },

  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%',
    maxWidth: 600,
  },
  carouselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  leftArrow: {
    width: 40,
    height: 40, 
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  rightArrow: {
    width: 40, 
    height: 40,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A6D95',
    paddingTop: 2,
  },  

  carouselContent: {
    alignItems: 'center',
    justifyContent: 'center',  
  },
  
  carouselImage: {
    width: '70%',
    height: 290,
    borderRadius: 20,
  },
  carouselTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#0A6D95',
    textAlign: 'center',
  },
  carouselDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#0B5FA5',
    textAlign: 'center',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 6,
  },
  carouselDotActive: {
    backgroundColor: '#118FC3',
  },
});
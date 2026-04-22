  import { useWindowDimensions } from 'react-native';
  
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  return {
    isWeb: width > 1065,
    isMobile: width <= 1064,
    width,
    height
  };
};
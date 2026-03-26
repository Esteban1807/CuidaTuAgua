// Detección automática de BASE_URL según el ambiente
const getBaseUrl = () => {
  // Si estamos en React Native (Expo)
  if (typeof global !== 'undefined') {
    // Para desarrollo local
    return 'http://localhost:8080';
    
    // Para emulador Android (descomenta si lo necesitas)
    // return 'http://10.0.2.2:8080';
    
    // Para dispositivo físico (cambia la IP)
    // return 'http://TU_IP_LOCAL:8080';
  }
  return 'http://localhost:8080';
};

export default {
  API_BASE_URL: getBaseUrl(),
};

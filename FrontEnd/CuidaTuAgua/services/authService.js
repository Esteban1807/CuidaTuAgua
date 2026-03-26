import apiConfig from '../config/apiConfig';

const BASE_URL = apiConfig.API_BASE_URL;

console.log('AUTH SERVICE - BASE_URL:', BASE_URL);

export const loginUser = async ({ identifier, password }) => {
  try {
    console.log('🔐 Iniciando login con:', identifier);
    
    const requestBody = { identifier, password };
    console.log('📤 Enviando request a:', `${BASE_URL}/api/auth/login`);
    
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      let errorPayload = null;
      try {
        errorPayload = await response.json();
        console.log('❌ Error response:', errorPayload);
      } catch (e) {
        console.log('❌ Error response (no JSON):', response.statusText);
      }
      
      return {
        success: false,
        message: (errorPayload && errorPayload.message) || `Error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log('✅ Login exitoso:', data);
    
    return {
      success: data.success,
      message: data.message,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.error('🚨 Error en login:', error);
    console.error('   Error message:', error.message);
    console.error('   Error stack:', error.stack);
    
    return {
      success: false,
      message: `Error de conexión: ${error.message}`,
    };
  }
};

export const registerUser = async (formData) => {
  try {
    console.log('📝 Iniciando registro');
    console.log('📤 Datos:', formData);
    
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      let errorPayload = null;
      try {
        errorPayload = await response.json();
        console.log('❌ Error response:', errorPayload);
      } catch (e) {
        console.log('❌ Error response (no JSON):', response.statusText);
      }
      
      return {
        success: false,
        message: (errorPayload && errorPayload.message) || `Error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log('✅ Registro exitoso:', data);
    
    return {
      success: data.success,
      message: data.message,
      user: data.user,
      home: data.home,
    };
  } catch (error) {
    console.error('🚨 Error en registro:', error);
    console.error('   Error message:', error.message);
    console.error('   Error stack:', error.stack);
    
    return {
      success: false,
      message: `Error de conexión: ${error.message}`,
    };
  }
};
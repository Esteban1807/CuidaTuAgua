# Dependencias del Proyecto CuidaTuAgua

## 📦 Dependencias Principales

### Framework & Runtime
- **react** (19.1.0) - Librería principal de UI. Proporciona componentes, hooks y estado reactivo para construir interfaces de usuario dinámicas y eficientes.
- **react-native** (0.81.5) - Framework que permite escribir aplicaciones móviles nativas para iOS y Android usando JavaScript/TypeScript, con componentes nativos.
- **react-dom** (19.1.0) - Paquete que habilita la renderización de componentes React en el navegador web, convirtiendo el árbol de componentes en DOM real.
- **expo** (~54.0.34) - Plataforma de desarrollo que simplifica el flujo de trabajo de React Native, ofreciendo herramientas, servicios y APIs preconfiguradas para iOS, Android y Web.

### Navegación
- **@react-navigation/native** (^7.2.3) - Librería base de navegación que proporciona contextos y hooks para manejar la navegación entre pantallas en aplicaciones React Native.
- **@react-navigation/stack** (^7.8.12) - Implementa navegación tipo stack (pila), donde las pantallas se apilan unas sobre otras permitiendo navegar hacia adelante y atrás.
- **@react-navigation/drawer** (^7.9.10) - Proporciona navegación tipo drawer (menú lateral deslizable) para acceder a diferentes secciones de la aplicación.
- **react-native-drawer-layout** (^4.2.2) - Componente nativo de drawer layout que proporciona un menú lateral con animaciones suaves y gestos.
- **react-native-screens** (~4.16.0) - Optimiza el rendimiento reemplazando componentes React Native estándar con implementaciones nativas más eficientes en la gestión de pantallas.
- **react-native-gesture-handler** (~2.28.0) - Librería de bajo nivel para capturar y responder a gestos nativos (toques, deslizamientos, pellizcos) con mejor rendimiento que las API estándar.
- **react-native-safe-area-context** (~5.6.0) - Proporciona contexto para acceder a información de áreas seguras del dispositivo (notches, barras de estado) para no ocultar contenido importante.

### Internacionalización (i18n)
- **i18next** (^22.5.1) - Framework completo de internacionalización que gestiona la traducción de strings, pluralización y formateo de fechas/números según la localización.
- **react-i18next** (^12.2.0) - Integración de i18next con React que proporciona hooks como `useTranslation()` para acceder a traducciones reactivamente en componentes.
- **i18n-js** (^3.8.0) - Librería alternativa de i18n simple para traducciones básicas y manejo de idiomas en la aplicación.
- **intl-pluralrules** (^2.0.1) - Polyfill que implementa las reglas de pluralización del estándar ECMA Internationalización, esencial para traducir correctamente plurales en diferentes idiomas.
- **expo-localization** (~17.0.8) - API de Expo que accede a la configuración de localización del dispositivo (idioma, región, zona horaria) para personalizar automáticamente la experiencia del usuario.

### UI & Iconografía
- **@expo/vector-icons** (^15.1.1) - Colección de iconos vectoriales de Expo que incluye múltiples sets (FontAwesome, Ionicons, MaterialCommunityIcons) listos para usar en componentes React Native.
- **lucide-react-native** (^1.14.0) - Librería de iconos modernos, minimalistas y customizables diseñada específicamente para React Native, con cientos de íconos de alta calidad.
- **react-native-svg** (15.12.1) - Proporciona componentes SVG en React Native, permitiendo renderizar gráficos vectoriales escalables y customizables sin perder calidad.
- **react-native-svg-web** (^1.0.9) - Complemento que extiende el soporte de SVG de react-native-svg para funcionar también en la versión web de la aplicación.

### Multimedia & Efectos
- **expo-av** (~16.0.8) - API de Expo para reproducción de audio y video con controles nativos, permitiendo tocar archivos de dispositivo, URL remotas o recursos empaquetados.
- **expo-video** (~3.0.16) - Componente de video avanzado basado en expo-av que proporciona un player de video nativo con controles personalizables y eventos de reproducción.
- **expo-blur** (~15.0.8) - API que aplica efectos de desenfoque (blur) nativo a componentes, útil para crear efectos visuales modernos como fondos difuminados o efectos glassmorphism.
- **expo-status-bar** (~3.0.9) - Componente que controla la apariencia y comportamiento de la barra de estado del sistema operativo (color, visibilidad, animación).

### Storage & Persistencia
- **@react-native-async-storage/async-storage** (2.2.0) - Solución de almacenamiento local asincrónico y persistente para React Native, ideal para guardar preferencias, tokens, o datos que deben perdurar entre sesiones sin necesidad de una base de datos compleja.

### Web Support
- **react-native-web** (^0.21.0) - Librería que permite ejecutar componentes React Native en navegadores web, mapeando componentes nativos a elementos HTML/CSS, habilitando una verdadera experiencia multiplataforma.
- **@expo/metro-runtime** (~6.1.2) - Runtime de Metro (el bundler de React Native) que Expo incluye para optimizar la carga de módulos y permitir hot reload durante el desarrollo.

### Utilities
- **react-native-reanimated** (~4.1.1) - Librería de animaciones de alto rendimiento que ejecuta animaciones en el hilo nativo en lugar del JavaScript, proporcionando transiciones suaves incluso con mucho contenido.
- **babel-plugin-module-resolver** (^5.0.3) - Plugin de Babel que permite usar rutas de importación cortas y alias en lugar de rutas relativas complejas, mejorando la legibilidad y mantenibilidad del código.

---

## 🛠️ Dependencias de Desarrollo

- **@types/react** (~19.1.10) - Type definitions (tipos) para React que proporcionan autocompletado e inteligencia de tipo en TypeScript para todos los componentes y hooks de React.
- **@types/react-native** (^0.72.8) - Type definitions para React Native que tipan todos los componentes, APIs y propiedades de React Native, esencial para desarrollo seguro con TypeScript.
- **typescript** (~5.9.2) - Lenguaje que extiende JavaScript con tipado estático, detección de errores en tiempo de compilación y mejor soporte IDE para desarrollo más robusto y mantenible.

---

## 📋 Resumen de Características

✅ **Multiplataforma**: iOS, Android y Web  
✅ **Internacionalización**: Soporte para múltiples idiomas (EN, ES, FR, PT)  
✅ **Tipado Seguro**: Desarrollo con TypeScript  
✅ **UI Moderna**: Componentes con Lucide Icons y animaciones  
✅ **Multimedia**: Soporte para video y audio  
✅ **Almacenamiento Local**: Async Storage para datos persistentes  
✅ **Navegación Avanzada**: Stack, Drawer y gestión de gestos  

---

**Última actualización**: 2026-07-21

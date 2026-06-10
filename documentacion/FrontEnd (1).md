# 💧 CuidaTuAgua — Frontend

Aplicación móvil y web desarrollada con **React Native + Expo + TypeScript** para el monitoreo del consumo de agua en hogares. Permite a los usuarios autenticarse, gestionar sus hogares y visualizar el estado de sus dispositivos de medición.

---

## Tabla de contenidos

- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Credenciales de prueba](#credenciales-de-prueba)
- [Flujo de navegación](#flujo-de-navegación)
- [Pantallas principales](#pantallas-principales)
- [Componentes reutilizables](#componentes-reutilizables)
- [Hooks](#hooks)
- [Sistema de tema](#sistema-de-tema)
- [Estado del proyecto](#estado-del-proyecto)

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| React | ^19.1.0 |
| React Native | ^0.81.5 |
| Expo | ~54.0.33 |
| TypeScript | ~5.9.2 |
| React Navigation (Stack) | ^7.8.9 |
| React Native Reanimated | ~4.1.1 |
| React Native Safe Area Context | ^5.7.0 |
| React Native Screens | ^4.24.0 |
| React Native Gesture Handler | ~2.28.0 |
| React Native Reanimated Carousel | ^4.0.3 |
| React Native Web | ^0.21.0 |
| Expo Blur | ~15.0.8 |
| Expo Vector Icons | ^15.1.1 |

---

## Estructura del proyecto

```
CuidaTuAgua/
├── App.tsx                             # Punto de entrada. Envuelve la app en SafeAreaProvider
├── index.ts                            # Registro de la aplicación
├── app.json                            # Configuración de Expo (nombre, íconos, splash, orientación)
├── tsconfig.json                       # Configuración de TypeScript (strict mode)
├── assets/
│   └── images/                         # Logo, íconos, splash screen e imágenes del carrusel
│       ├── logo.png
│       ├── logo-fondo.png
│       ├── flecha-izquierda.png
│       ├── Imagen1.jpg / Imagen2.jpg / Imagen3.jpg   # Carrusel del login web
│       ├── icon.png / adaptive-icon.png / favicon.png / splash-icon.png
├── components/
│   ├── auth/                           # Componentes reutilizables del flujo de autenticación
│   │   ├── AuthLink.tsx                # Enlace de texto clickeable
│   │   ├── CheckboxField.tsx           # Checkbox con etiqueta
│   │   ├── InputField.tsx              # Campo de texto estilizado
│   │   ├── LoginHeader.tsx             # Encabezado con logo para pantallas de auth
│   │   ├── PrimaryButton.tsx           # Botón principal de acción
│   │   └── TermsModal.tsx              # Modal de términos y condiciones
│   └── common/
│       └── FeedbackModal.js            # Modal de retroalimentación (éxito/error/info)
├── hooks/
│   ├── useAuth.js                      # Hook para consumir el AuthContext
│   └── useResponsive.ts               # Hook de dimensiones y breakpoints responsive
├── navigation/
│   └── AppNavigator.tsx               # Enrutamiento con animaciones fade + slide
├── screens/
│   ├── LandingScreen.tsx              # Pantalla de bienvenida (solo web)
│   ├── LandingScreen.styles.ts
│   ├── auth/
│   │   ├── LoginScreen.tsx            # Login con carrusel animado (web) y form simple (mobile)
│   │   ├── LoginScreen.styles.ts
│   │   ├── RegisterScreen.tsx         # Registro de usuario + hogar en un solo flujo
│   │   └── RegisterScreen.styles.ts
│   ├── dashboard/
│   │   └── DashboardScreen.tsx        # Panel principal tras seleccionar un hogar
│   └── homes/
│       └── HomesScreen.js             # Listado y selección de hogares
├── context/
│   └── AuthContext.js                 # Estado global de autenticación y hogares
├── services/
│   └── authService.js                 # Lógica de autenticación (mock)
└── theme/
    ├── Colors.ts                       # Paleta de colores del sistema
    ├── Spacing.ts                      # Escala de espaciado
    ├── Typography.ts                   # Estilos tipográficos base
    └── index.ts                        # Re-exportación unificada del tema
```

---

## Instalación

### Prerrequisitos

- Node.js >= 18
- npm o yarn
- Expo CLI instalado globalmente (`npm install -g expo-cli`)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd CuidaTuAgua

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npm start          # Menú interactivo de Expo
npm run android    # Abrir en emulador Android
npm run ios        # Abrir en simulador iOS
npm run web        # Abrir en navegador
```

---

## Credenciales de prueba

> El servicio de autenticación actualmente usa datos simulados (mock). Usa las siguientes credenciales para iniciar sesión:

| Campo | Valor |
|---|---|
| Correo o documento | `correo@cuidatuagua.com` o `123456` |
| Contraseña | `1234` |

---

## Flujo de navegación

El `AppNavigator` no usa librerías de routing externas. Gestiona las transiciones entre pantallas con animaciones propias (`Animated.parallel` de fade + slide) y renderiza condicionalmente según el estado de la sesión.

```
App.tsx
└── SafeAreaProvider
    └── AppNavigator
        ├── [Web] → LandingScreen  →  LoginScreen
        ├── [Mobile] → LoginScreen (pantalla inicial)
        │
        ├── LoginScreen  →  RegisterScreen
        │                →  DashboardScreen (login exitoso)
        └── RegisterScreen  →  LoginScreen (registro exitoso)
```

> **Nota:** `HomesScreen` está implementada y usa `useAuth`, pero actualmente no está conectada al flujo del navigator.

---

## Pantallas principales

### LandingScreen *(solo web)*
Pantalla de bienvenida con navbar que incluye el logo y botón "Acceder". Usa `BlurView` de Expo para el efecto de fondo del navbar. Se muestra únicamente en plataforma web antes de llegar al login.

### LoginScreen
Pantalla de inicio de sesión con dos modos de visualización según la plataforma:
- **Web:** layout de dos columnas con un carrusel animado (3 imágenes con auto-avance cada 5 segundos y controles manuales) al lado derecho del formulario.
- **Mobile:** formulario centrado con encabezado de logo.

Valida que los campos no estén vacíos antes de continuar. Incluye enlace a "¿Olvidaste tu contraseña?" (no implementado) y acceso al registro.

### RegisterScreen
Formulario de registro dividido en dos secciones: **datos del usuario** (nombre, documento, correo, contraseña) e **información del hogar** (nombre, dirección, estrato, habitantes). Requiere aceptar los términos y condiciones. Tiene un botón de retroceso hacia el login. Adapta su layout a web y mobile con `useResponsive`.

### HomesScreen
Muestra la lista de hogares asociados al usuario. Permite seleccionar un hogar mediante `setSelectedHome`. Incluye una tarjeta de "Agregar hogar" (funcionalidad pendiente). Usa `useAuth` para obtener datos del usuario y la lista de hogares.

### DashboardScreen
Panel principal tras seleccionar un hogar. Muestra el resumen de consumo mensual (mock: 120 L) y el estado del servicio. Incluye botón de "Cerrar sesión" que redirige al login.

---

## Componentes reutilizables

Todos los componentes de `auth/` consumen el sistema de tema centralizado (`theme/Colors`, `theme/Spacing`, `theme/Typography`).

### `InputField`
Campo de texto estilizado. Props: `value`, `onChangeText`, `placeholder`, `keyboardType`, `secureTextEntry`.

### `PrimaryButton`
Botón principal. Props: `title`, `onPress`, `disabled`, `loading` (muestra `ActivityIndicator`), `style`. Se deshabilita automáticamente cuando `loading` es `true`.

### `AuthLink`
Enlace de texto clickeable. Props: `text`, `onPress`, `center` (alineación centrada, default `false`).

### `CheckboxField`
Checkbox con etiqueta y soporte para `onLabelPress` (útil para abrir el modal de términos por separado).

### `TermsModal`
Modal con los términos y condiciones. Props: `visible`, `onClose`.

### `FeedbackModal`
Modal genérico de retroalimentación. Props: `visible`, `type` (`'success' | 'error' | 'info'`), `title`, `message`, `onClose`.

---

## Hooks

### `useAuth`
Consume el `AuthContext` y expone:

| Propiedad / Función | Descripción |
|---|---|
| `user` | Objeto con los datos del usuario autenticado |
| `homes` | Lista de hogares del usuario |
| `selectedHome` | Hogar actualmente seleccionado |
| `setSelectedHome(home)` | Función para seleccionar un hogar |
| `isAuthenticated` | Booleano de estado de sesión |
| `loading` | Indicador de carga durante operaciones async |
| `login(identifier, password)` | Inicia sesión y actualiza el estado |
| `register(formData)` | Registra un nuevo usuario y hogar |
| `logout()` | Cierra la sesión y limpia el estado |

```ts
const { user, login, logout } = useAuth();
```

### `useResponsive`
Devuelve dimensiones de la ventana y breakpoints calculados. Breakpoint: `isWeb` cuando `width > 1065`.

```ts
const { isWeb, isMobile, width, height } = useResponsive();
```

---

## Sistema de tema

El proyecto centraliza los tokens de diseño en `theme/`:

### `Colors.ts`
```ts
primary:       '#0A6D95'   // Azul oscuro principal
secondary:     '#118FC3'   // Azul medio
background:    '#F3F4F6'
surface:       '#FFFFFF'
textPrimary:   '#1F2937'
textSecondary: '#0B5FA5'
success:       '#16A34A'
error:         '#DC2626'
warning:       '#F59E0B'
```

### `Spacing.ts`
Escala: `xs: 4` / `sm: 8` / `md: 16` / `lg: 24` / `xl: 32` / `xxl: 50`

### `Typography.ts`
Variantes: `title` (28/700), `subtitle` (18/600), `body` (14), `small` (12)

---

## Estado del proyecto

| Módulo | Estado |
|---|---|
| Landing (web) | ✅ Funcional |
| Autenticación — Login | ✅ Funcional (mock) |
| Autenticación — Registro | ✅ Funcional (mock) |
| Gestión de hogares — Listado y selección | ✅ Implementado |
| Agregar nuevo hogar | 🔄 En desarrollo |
| Dashboard — Consumo mensual | 🔄 Mock estático |
| Dashboard — Monitoreo en tiempo real | 🔄 En desarrollo |
| Dashboard — Historial | 🔄 En desarrollo |
| Recuperación de contraseña | 🔄 En desarrollo |
| Conexión a backend real | ⏳ Pendiente |
| HomesScreen conectada al navigator | ⏳ Pendiente |

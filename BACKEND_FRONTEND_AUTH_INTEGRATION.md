# Conexión backend-frontend: registro y login (CuidaTuAgua)

Este documento acompaña la implementación completa y detalla paso a paso cómo quedó el flujo de registro/login.

## 0) Estado final del proyecto

- Backend: Spring Boot + JPA + MySQL
- Frontend: React Native + web (app Expo)
- `AuthController` con endpoints `/api/auth/register` y `/api/auth/login`
- `User` con propiedades (`fullName`, `document`, `email`, `password`) y relación con `Home`
- `Home` con propiedades (`name`, `address`, `stratum`, `inhabitants`) y FK a `User`
- Frontend usa `AuthContext` para manejar autenticación global

---

## 1) Backend: estructura de entidades y repositorios

### 1.1 Entidad `user`
Ubicación: `backTest/src/main/java/com/example/backTest/Entity/Security/user.java`

- Campos:
  - `fullName` (String)
  - `document` (String, `unique`)
  - `email` (String, `unique`)
  - `password` (String)
  - `status` (boolean) heredado de `baseModel`
- Relación:
  - `@OneToMany(mappedBy = "user")` con `List<home> homes`

### 1.2 Entidad `home`
Ubicación: `backTest/src/main/java/com/example/backTest/Entity/Security/home.java`

- Campos:
  - `name` (String)
  - `address` (String)
  - `stratum` (Integer)
  - `inhabitants` (Integer)
  - `status` (boolean)
- Relación:
  - `@ManyToOne` con `user` (foreign key `user_id`)

### 1.3 Repositorios

- `IUserRepository` en `backTest/src/main/java/.../IUserRepository.java`
  - `Optional<user> findByEmail(String email);`
  - `Optional<user> findByDocument(String document);`

- `IHomeRepository` en `backTest/src/main/java/.../IHomeRepository.java`
  - hereda CRUD de `IBaseRepository<home>`

### 1.4 Servicios backend

- `userService` y `homeService` heredan `baseService` para métodos CRUD básicos.

---

## 2) Backend: controlador de auth

Archivo: `backTest/src/main/java/com/example/backTest/Controller/Implement/Security/AuthController.java`

### 2.1 CORS global
Se agregó `CorsConfig.java`:
- Mapea `/api/**`
- Permite `localhost` y `10.0.2.2`
- Métodos: GET/POST/PUT/DELETE/OPTIONS

### 2.2 DTOs para evitar ciclos JSON
- `UserDTO` y `HomeDTO` en `backTest/src/main/java/com/example/backTest/DTO/`
- En las respuestas se envía DTO en vez de la entidad para evitar punteros circulares y JSON inválido.

### 2.3 Registro (`POST /api/auth/register`)
1. Valida obligatorios: `fullName`, `document`, `email`, `password`, `homeName`, `address`, `stratum`, `inhabitants`
2. Verifica unicidad:
   - `email` no puede existir
   - `document` no puede existir
3. Crea usuario y guarda con `userRepository.save`
4. Crea hogar vinculado `home.setUser(savedUser)` y guarda `homeRepository.save`
5. Devuelve JSON:
   - `success: true`
   - `message` explicativo
   - `user` (UserDTO)
   - `home` (HomeDTO)
6. En errores envía `success:false` con mensajes concretos.

### 2.4 Login (`POST /api/auth/login`)
1. Recibe `identifier` + `password`
2. Busca usuario:
   - primero `findByEmail(identifier)`
   - si no existe busca `findByDocument(identifier)`
3. Compara contraseña en texto (temporal; en producción: bcrypt)
4. Devuelve JSON:
   - `success: true`, `message`, `user` (UserDTO)
   - o `success: false` + texto de error

---

## 3) Frontend: configuración de URL de API

### 3.1 Config file
Archivo: `FrontEnd/CuidaTuAgua/config/apiConfig.js`

```js
const getBaseUrl = () => 'http://localhost:8080'; // cambiar según entorno
export default { API_BASE_URL: getBaseUrl() };
```

### 3.2 Servicio auth
Archivo: `FrontEnd/CuidaTuAgua/services/authService.js`

- `loginUser({ identifier, password })`:
  - POST `/api/auth/login`
  - body `{ identifier, password }`
  - maneja 200 / errores y parseo JSON
  - logs de debug console para URL, status, payload

- `registerUser(formData)`:
  - POST `/api/auth/register`
  - body `formData` con fullName/document/email/password/homeName/address/stratum/inhabitants
  - logs de debug y manejo de errores

---

## 4) Frontend: AuthContext global

Archivo: `FrontEnd/CuidaTuAgua/context/AuthContext.js`

- Estado:
  - `user`, `homes`, `selectedHome`, `token`, `isAuthenticated`, `loading`
- Acciones:
  - `login`: invoca `loginUser`, setea `user`, `homes`, `token`, `isAuthenticated`
  - `register`: invoca `registerUser`, retorna resultado success/message
  - `logout`: limpia todo
- Exporta context y hook `useAuth`

---

## 5) Frontend: pantalla de registro

Archivo: `FrontEnd/CuidaTuAgua/screens/auth/RegisterScreen.js` (y plataformas)

Maneja campos:
- `fullName`, `document`, `email`, `password`
- `homeName`, `address`, `stratum`, `inhabitants`
- `acceptedTerms` etc.

En `handleRegister` valida campo a campo y llama `register(...)`.

---

## 6) Frontend: pantalla de login

Archivo: `FrontEnd/CuidaTuAgua/screens/auth/LoginScreen.js`

Maneja campos:
- `identifier` (documento o email)
- `password`

En `handleLogin` llama `login(...)`.

---

## 7) Pruebas manuales recomendadas

1. Iniciar backend:
   - `cd backTest`
   - `.
mvnw.cmd spring-boot:run`

2. Test rápido en terminal con PowerShell:
   - `Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" ...`
   - `Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" ...`

3. Probar en Thunder Client/Postman:
   - `POST http://localhost:8080/api/auth/register`
   - `POST http://localhost:8080/api/auth/login`

4. Verificar el frontend:
   - Revisar consola si se usa `<AuthContext />` y `console.log` de authService
   - Cambiar `BASE_URL` a:
     - `http://localhost:8080` (dev web)
     - `http://10.0.2.2:8080` (Android emulador)
     - `http://<IP_MAQUINA>:8080` (dispositivo físico)

5. Validar DB (MySQL): las tablas `users` y `homes` se crean en el startup.

---

## 8) Resolución del error `Unexpected token ']'`

Ese error vino de serializar directamente la entidad `user` con `List<home>` y de la relación bidireccional, generando JSON corrupto. Solución aplicada:
- Uso de DTOs (`UserDTO`, `HomeDTO`) para respuesta exacta.
- El controlador nunca retorna entity con claves circulares.

---

## 9) Siguientes mejoras (recomendado)

1. Hash de password: `BCryptPasswordEncoder`.
2. JWT: generar token en `/login` y `Authorization` en frontend.
3. Persistencia con DTOs y mapeo `ModelMapper` si el dominio crece.
4. Validaciones `@NotNull`, `@Email`, `@Size` en entidades.
5. Manejo de negocio (registro de hogares ilimitados, roles, confirmación por email).

---

## 11) Estructura del proyecto: objetivos de carpetas y archivos

### 11.1 Backend (backTest/)

#### src/main/java/com/example/backTest/
- **BackTestApplication.java**: Clase principal de Spring Boot que inicia la aplicación y configura el contexto.

- **Config/**: Configuraciones globales.
  - **CorsConfig.java**: Configura CORS para permitir conexiones desde frontend (localhost, emuladores).

- **Controller/**: Controladores REST que manejan las peticiones HTTP.
  - **Implement/Base/**: Controladores genéricos.
    - **baseController.java**: Controlador base con métodos CRUD (GET, POST, DELETE) para cualquier entidad.
  - **Implement/Security/**: Controladores específicos de seguridad.
    - **AuthController.java**: Maneja `/api/auth/register` y `/api/auth/login`.
    - **userController.java**: Extiende baseController para operaciones CRUD en usuarios.
  - **Interface/Base/**: Interfaces de controladores.
    - **IBaseController.java**: Define métodos CRUD genéricos.
  - **Interface/Security/**: Interfaces específicas.
    - **IUserController.java**: Extiende IBaseController para usuarios.

- **DTO/**: Objetos de Transferencia de Datos para respuestas JSON limpias.
  - **HomeDTO.java**: Representa datos de hogar sin referencias circulares.
  - **UserDTO.java**: Representa datos de usuario sin referencias circulares.

- **Entity/**: Modelos de datos JPA mapeados a tablas de BD.
  - **Base/**: Modelos base.
    - **baseModel.java**: Clase abstracta con campos comunes (`id`, `status`).
  - **Security/**: Entidades de seguridad.
    - **home.java**: Entidad para hogares con relación ManyToOne a user.
    - **user.java**: Entidad para usuarios con relación OneToMany a homes.

- **Repository/**: Interfaces para acceso a datos con Spring Data JPA.
  - **Implement/Base/**: Implementaciones base.
    - **baseRepository.java**: Implementación base de repositorio.
  - **Interface/Base/**: Interfaces base.
    - **IBaseRepository.java**: Define métodos CRUD básicos.
  - **Interface/Security/**: Interfaces específicas.
    - **IHomeRepository.java**: Extiende IBaseRepository para homes.
    - **IUserRepository.java**: Extiende IBaseRepository con métodos de búsqueda por email/document.

- **Service/**: Lógica de negocio.
  - **Implement/Base/**: Servicios genéricos.
    - **baseService.java**: Servicio base con métodos CRUD.
  - **Implement/Security/**: Servicios específicos.
    - **homeService.java**: Extiende baseService para homes.
    - **userService.java**: Extiende baseService para users.
  - **Interface/Base/**: Interfaces de servicios.
    - **IBaseService.java**: Define métodos CRUD.
  - **Interface/Security/**: Interfaces específicas.
    - **IUserService.java**: Extiende IBaseService para users.

#### src/main/resources/
- **application.properties**: Configuración de BD (MySQL), puerto, etc.

#### src/test/java/com/example/backTest/
- **BackTestApplicationTests.java**: Tests de integración de Spring Boot.

### 11.2 Frontend (FrontEnd/CuidaTuAgua/)

- **App.js**: Componente raíz que envuelve la app con AuthProvider y AppNavigator.

- **app.json**: Configuración de Expo para la app React Native.

- **index.js**: Punto de entrada que registra el componente raíz con Expo.

- **package.json**: Dependencias de Node.js y scripts de la app.

- **assets/**: Recursos estáticos (imágenes, fuentes).

- **components/**: Componentes reutilizables de UI.
  - **auth/**: Componentes específicos de autenticación (InputField, PrimaryButton, etc.).
  - **common/**: Componentes comunes (FeedbackModal).
  - **mobile/**: Componentes específicos para móvil.
  - **web/**: Componentes específicos para web.

- **config/**: Configuraciones de la app.
  - **apiConfig.js**: Define la URL base de la API según el entorno.

- **context/**: Contextos de React para estado global.
  - **AuthContext.js**: Maneja estado de autenticación (user, token, login, register, logout).

- **hooks/**: Hooks personalizados.
  - **useAuth.js**: Hook para acceder al AuthContext.

- **navigation/**: Navegación de la app.
  - **AppNavigator.js**: Define las rutas y navegación condicional (auth vs dashboard).

- **screens/**: Pantallas de la app.
  - **auth/**: Pantallas de autenticación.
    - **LoginScreen.js**: Pantalla principal de login.
    - **RegisterScreen.js**: Pantalla principal de registro.
    - **platform/**: Versiones específicas por plataforma (mobile/web).
  - **dashboard/**: Pantallas del dashboard post-login.
  - **homes/**: Pantallas de gestión de hogares.

- **services/**: Servicios para llamadas a API.
  - **authService.js**: Funciones para login y register con fetch al backend.

---

Con esto, el sistema de autenticación ya está completo y pasa de un mock a un flujo real con persistencia.


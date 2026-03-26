# Conexión backend-frontend: registro y login (CuidaTuAgua)

Este documento explica los cambios realizados para conectar el backend de Spring Boot con el frontend React Native/React en las pantallas de Login y Register.

## 1) Backend: agregar endpoints de autenticación

### 1.1 Archivo creado
- `backTest/src/main/java/com/example/backTest/Controller/Implement/Security/AuthController.java`

### 1.2 Endpoints expuestos
- `POST /api/auth/register`
- `POST /api/auth/login`

### 1.3 Flujo de register
- Valida `username` y `password` (ambos obligatorios)
- Verifica si `username` ya existe
- Guarda usuario en `users` con `userRepository.save()`
- Retorna JSON con `success`, `message`, `user`

### 1.4 Flujo de login
- Lee `username`, `password` desde body
- Busca usuario con `userRepository.findByUsername(username)`
- Compara password plano (temporal; en producción usar hash bcrypt)
- Retorna JSON con `success`, `message`, `user`

## 2) Backend: repository

### 2.1 Archivo modificado
- `backTest/src/main/java/com/example/backTest/Repository/Interface/Security/IUserRepository.java`

### 2.2 Método agregado
- `Optional<user> findByUsername(String username);`

Esto habilita la consulta en Spring Data JPA.

## 3) Frontend: servicios auth con llamadas reales

### 3.1 Archivo modificado
- `FrontEnd/CuidaTuAgua/services/authService.js`

### 3.2 Base URL
- `const BASE_URL = 'http://10.0.2.2:8080'` (Android emulator)
- Ajustar a `http://localhost:8080` en iOS simulator, o `http://<IP-local>:8080` en dispositivo físico.

### 3.3 loginUser
- POST `
/api/auth/login`
- JSON: `{ username: identifier, password }
- Devuelve la respuesta del servidor (success, message, user, token)

### 3.4 registerUser
- POST `/api/auth/register`
- JSON: `formData` completo
- Devuelve la respuesta del servidor (success, message, user)

## 4) Frontend: contexto de auth (estado global)

### 4.1 Archivo modificado
- `FrontEnd/CuidaTuAgua/context/AuthContext.js`

### 4.2 Campos nuevos y cambios
- estado `token` agregado
- al hacer `login`, si existe `response.token` se guarda
- `logout` limpia `token` y `user`.
- se incluye `token` en el provider para usar en fetchs posteriores

## 5) Cómo probarlo

1. Ejecutar backend:
   - `cd backTest`
   - `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`)
2. Verificar desde Postman:
   - `POST http://localhost:8080/api/auth/register` body JSON:
     `{ "username": "test", "password": "1234" }`
   - `POST http://localhost:8080/api/auth/login` body JSON:
     `{ "username": "test", "password": "1234" }`
3. Ejecutar frontend.
4. En pantalla registro, completar y submit.
5. En pantalla login, usar user creado y validar que `isAuthenticated` cambia.

## 6) Notas para siguiente paso

- En producción, usar hashing seguro (`BCryptPasswordEncoder`) en server.
- Agregar tokens JWT en login y usar `Authorization: Bearer <token>` en fetch.
- Agregar control de errores y UI de carga / mensajes.
- Ajustar CORS en `application.properties` o `WebMvcConfigurer` si es necesario.

---

Con esto, el flujo ya está enlazado: front envia credenciales al backend, backend maneja usuarios y responde con JSON, front actualiza estado global y navega a dashboard.

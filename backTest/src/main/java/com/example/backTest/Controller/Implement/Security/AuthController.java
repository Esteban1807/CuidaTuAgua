package com.example.backTest.Controller.Implement.Security;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backTest.DTO.HomeDTO;
import com.example.backTest.DTO.UserDTO;
import com.example.backTest.Entity.Security.home;
import com.example.backTest.Entity.Security.user;
import com.example.backTest.Repository.Interface.Security.IHomeRepository;
import com.example.backTest.Repository.Interface.Security.IUserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final IUserRepository userRepository;
    private final IHomeRepository homeRepository;

    public AuthController(IUserRepository userRepository, IHomeRepository homeRepository) {
        this.userRepository = userRepository;
        this.homeRepository = homeRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String fullName = request.get("fullName");
        String document = request.get("document");
        String email = request.get("email");
        String password = request.get("password");
        String homeName = request.get("homeName");
        String address = request.get("address");
        String stratumStr = request.get("stratum");
        String inhabitantsStr = request.get("inhabitants");

        // Validar campos de usuario
        if (fullName == null || fullName.trim().isEmpty() ||
            document == null || document.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Nombre, documento, correo y contraseña son obligatorios");
            return ResponseEntity.badRequest().body(response);
        }

        // Validar campos de hogar
        if (homeName == null || homeName.trim().isEmpty() ||
            address == null || address.trim().isEmpty() ||
            stratumStr == null || stratumStr.trim().isEmpty() ||
            inhabitantsStr == null || inhabitantsStr.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Los datos del hogar son obligatorios");
            return ResponseEntity.badRequest().body(response);
        }

        // Validar que email no exista
        Optional<user> existingUserEmail = userRepository.findByEmail(email);
        if (existingUserEmail.isPresent()) {
            response.put("success", false);
            response.put("message", "El correo electrónico ya está registrado");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Validar que documento no exista
        Optional<user> existingUserDocument = userRepository.findByDocument(document);
        if (existingUserDocument.isPresent()) {
            response.put("success", false);
            response.put("message", "El documento ya está registrado");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        try {
            user newUser = new user();
            newUser.setFullName(fullName);
            newUser.setDocument(document);
            newUser.setEmail(email);
            newUser.setPassword(password);
            newUser.setStatus(true);

            user savedUser = userRepository.save(newUser);

            Integer stratum = Integer.parseInt(stratumStr);
            Integer inhabitants = Integer.parseInt(inhabitantsStr);

            home newHome = new home();
            newHome.setName(homeName);
            newHome.setAddress(address);
            newHome.setStratum(stratum);
            newHome.setInhabitants(inhabitants);
            newHome.setUser(savedUser);
            newHome.setStatus(true);

            home savedHome = homeRepository.save(newHome);

            UserDTO userDTO = new UserDTO(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getDocument(),
                savedUser.getEmail(),
                savedUser.getStatus()
            );

            HomeDTO homeDTO = new HomeDTO(
                savedHome.getId(),
                savedHome.getName(),
                savedHome.getAddress(),
                savedHome.getStratum(),
                savedHome.getInhabitants(),
                savedHome.getStatus()
            );

            response.put("success", true);
            response.put("message", "Cuenta creada correctamente");
            response.put("user", userDTO);
            response.put("home", homeDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (NumberFormatException e) {
            response.put("success", false);
            response.put("message", "Estrato e habitantes deben ser números");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al crear la cuenta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String identifier = request.get("identifier"); // puede ser email O document
        String password = request.get("password");

        if (identifier == null || identifier.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Documento/correo y contraseña son obligatorios");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<user> foundUser = Optional.empty();

        // Buscar por email primero
        foundUser = userRepository.findByEmail(identifier);
        // Si no encuentra por email, buscar por documento
        if (foundUser.isEmpty()) {
            foundUser = userRepository.findByDocument(identifier);
        }

        if (foundUser.isEmpty() || !foundUser.get().getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Credenciales inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        user foundUserEntity = foundUser.get();
        UserDTO userDTO = new UserDTO(
            foundUserEntity.getId(),
            foundUserEntity.getFullName(),
            foundUserEntity.getDocument(),
            foundUserEntity.getEmail(),
            foundUserEntity.getStatus()
        );

        response.put("success", true);
        response.put("message", "Login exitoso");
        response.put("user", userDTO);

        return ResponseEntity.ok(response);
    }
}


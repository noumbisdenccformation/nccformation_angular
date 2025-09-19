package com.ncc.backend.controller;

import com.ncc.backend.dto.AuthResponse;
import com.ncc.backend.dto.LoginRequest;
import com.ncc.backend.dto.RegisterRequest;
import com.ncc.backend.model.Role;
import com.ncc.backend.model.User;
import com.ncc.backend.repository.UserRepository;
import com.ncc.backend.security.JwtUtils;
import com.ncc.backend.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PasswordEncoder encoder;
    
    @Autowired
    JwtUtils jwtUtils;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        return ResponseEntity.ok(new AuthResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getAuthorities().stream()
                        .findFirst()
                        .map(authority -> Role.valueOf(authority.getAuthority().replace("ROLE_", "")))
                        .orElse(Role.USER)));
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur: Le nom d'utilisateur est déjà pris!");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur: L'email est déjà utilisé!");
        }
        
        // Créer un nouvel utilisateur
        User user = new User(registerRequest.getUsername(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()));
        
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPhone(registerRequest.getPhone());
        
        userRepository.save(user);
        
        return ResponseEntity.ok("Utilisateur enregistré avec succès!");
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API d'authentification fonctionnelle!");
    }
} 
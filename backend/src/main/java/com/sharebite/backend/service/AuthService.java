package com.sharebite.backend.service;

import com.sharebite.backend.dto.AuthRequest;
import com.sharebite.backend.dto.AuthResponse;
import com.sharebite.backend.dto.RegisterRequest;
import com.sharebite.backend.entity.User;
import com.sharebite.backend.repository.UserRepository;
import com.sharebite.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public java.util.Map<String, Object> register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        user = userRepository.save(user);
        
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "User registered successfully");
        response.put("userId", user.getId());
        response.put("role", user.getRole().name());
        return response;
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}

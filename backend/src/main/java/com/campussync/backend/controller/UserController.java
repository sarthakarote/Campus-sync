package com.campussync.backend.controller;

import com.campussync.backend.model.User;
import com.campussync.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        if (loginRequest.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is required");
        }

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail().trim());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword() != null && user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || !user.getEmail().trim().toLowerCase().endsWith("@dbit.in")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration restricted to @dbit.in emails only!");
        }

        if (userRepository.findByEmail(user.getEmail().trim()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered!");
        }

        // Set fallback default for name if not passed
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            user.setName("DBIT Member");
        }

        // Set fallback defaults for non-nullable profile fields
        if (user.getCollege() == null) user.setCollege("Don Bosco Institute Of Technology, Kurla");
        if (user.getBranch() == null) user.setBranch("Computer Engineering");
        if (user.getYear() == null) user.setYear("SE");

        user.setEmail(user.getEmail().trim());
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
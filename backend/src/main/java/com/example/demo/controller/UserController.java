package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import java.util.Collections;
// import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/add")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    @GetMapping("/details")
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = userService.authenticateUser(email, password);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = generateToken(user);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @PostMapping(value = "/forgot-password", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String token = userService.generateResetToken(email);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
        // TODO: Send email with reset link containing token
        sendResetEmail(email, token);
        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping(value = "/reset-password", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        if (!userService.validateResetToken(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }
        boolean success = userService.resetPassword(token, newPassword);
        if (!success) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password");
        }
        // TODO: Send confirmation email
        sendConfirmationEmail(userService.getUserByEmail(userService.getUserByResetToken(token).getEmail()));
        return ResponseEntity.ok("Password has been reset successfully");
    }

    private void sendResetEmail(String email, String token) {
        // Placeholder for email sending logic
        System.out.println("Sending password reset email to " + email + " with token: " + token);
    }

    private void sendConfirmationEmail(User user) {
        // Placeholder for email sending logic
        System.out.println("Sending password reset confirmation email to " + user.getEmail());
    }

    private String generateToken(User user) {
        return ("userId=" + user.getId() + ", email=" + user.getEmail());
    }

}
